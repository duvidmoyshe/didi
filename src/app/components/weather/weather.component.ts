import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LocationData } from 'src/app/states/location-state/location.model';
import { WeatherData } from 'src/app/states/weather-state/weather.model';
import { FavoritesService } from '../../states/favorites-state/favorites.service';
import { ActionDialogComponent } from '../dialog/action-dialog/action-dialog.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  private destroy$ = new Subject<void>();
  searchInputControl = new FormControl();
  weatherData$: Observable<WeatherData> | undefined;
  fiveDayForecast$!: Observable<any>;
  searchResults$!: Observable<LocationData[]>;
  cityName = 'Tel Aviv';
  cityId: any;
  showCelsius = true;

  constructor(
    private apiService: ApiService,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initialCity();
    this.favoritesService.currentFavorite.pipe(
      takeUntil(this.destroy$)
    ).subscribe((fav) => {
      if (fav) {
        this.getWeatherData(fav.id);
        this.cityName = fav.favoriteName
        this.searchInputControl.setValue(fav.favoriteName);
      }
     }
    )

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(600),
        distinctUntilChanged()
      ).subscribe(res => this.searchResults$ = this.apiService.searchLocation(res))

  }

  initialCity() {
    this.searchInputControl.setValue('Tel Aviv');
    this.searchResults$ = this.apiService.searchLocation('Tel Aviv');
    this.searchResults$.pipe(
      takeUntil(this.destroy$),
      map(sr => sr[0]?.Key))
      .subscribe(key => {
        console.log(key)
        this.cityId = key,
          this.getWeatherData();
        this.getFiveDayForecast();
      }
      )
  }

  getWeatherData(favoriteId?: string) {
    if (favoriteId) {
      this.cityId = favoriteId;
      this.weatherData$ = this.apiService.getWeatherDetails(favoriteId)
        .pipe(
          takeUntil(this.destroy$));
      this.getFiveDayForecast();
    }
    else {
      this.weatherData$ = this.apiService.getWeatherDetails(this.cityId)
        .pipe(
          takeUntil(this.destroy$));
    }
  }

  getFiveDayForecast() {
    this.fiveDayForecast$ = this.apiService.getForecast(this.cityId).pipe(
      takeUntil(this.destroy$),
    );
  }

  onOptionSelected(event?: MatAutocompleteSelectedEvent) {
    this.searchInputControl.setValue(event?.option.value.LocalizedName);
    this.cityName = event?.option.value.LocalizedName;
    this.cityId = event?.option.value.Key
    this.getWeatherData();
    this.getFiveDayForecast();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActionDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      result ? this.favoritesService.removeFavorite(this.cityId) : null
    });
  }

  toggleFavorite(weatherData: WeatherData) {
    const isExistFavorite = this.favoritesService.getFavorite(this.cityId)
    if (isExistFavorite)
      return this.openDialog();
    else {
      this.favoritesService.addFavorite(
        { weatherData: weatherData, id: this.cityId, favoriteName: this.cityName })
      let allFavorites = this.favoritesService.getAllFavorites()
      const cityIndex = allFavorites.indexOf(this.cityId);
      if (cityIndex !== -1) {
        allFavorites.splice(cityIndex, 1);
        this.snackBar.open('selected city already exists', 'Close', {
          duration: 3000,
        });
      } else {
        if (allFavorites.length < 10) {
          allFavorites.push(this.cityId);
          this.snackBar.open('city added successfully', 'Close', {
            duration: 3000,
          });
        }
      }
      return { allFavorites };
    }
  };

  toggleTemperatureUnit(): void {
    this.showCelsius = !this.showCelsius;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
