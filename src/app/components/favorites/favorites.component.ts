import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { Favorite } from '../../states/favorites-state/favorites.model';
import { FavoritesService } from '../../states/favorites-state/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  private destroy$ = new Subject<void>();
  favoriteCities$!: Observable<any>;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    const favQuery = this.favoritesService.getAllFavorites();
    if (favQuery)
      this.favoriteCities$ = of(favQuery);
  }

  navigateToWeatherDetails(favorite: Favorite) {

    this.favoritesService.updateFavoriteSub(favorite);
    this.router.navigate(['weather'])
  }

  ngOnDestroy(): void {
    // this.favoritesService.resetFavorites();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
