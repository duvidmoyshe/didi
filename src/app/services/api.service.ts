import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { Forecast } from '../states/forecast-state/forecast.model';
import { ForecastStore } from '../states/forecast-state/forecast.store';
import { Location, LocationData } from '../states/location-state/location.model';
import { LocationQuery } from '../states/location-state/location.query';
import { Weather, WeatherData } from '../states/weather-state/weather.model';
import { WeatherQuery } from '../states/weather-state/weather.query';
import { WeatherStore } from '../states/weather-state/weather.store';
import { ForecastQuery } from './../states/forecast-state/forecast.query';
import { LocationStore } from './../states/location-state/location.store';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private readonly apiKey = '1Rdg0bkJtiJAPkHjuYKFgA3A8YRMVSTw';
  private readonly apiUrl = 'https://dataservice.accuweather.com';

  private readonly STORAGE_KEYS = {
    cities: 'cities',
    weatherData: 'weatherData',
    forecastData: 'forecastData'
  };

  constructor(
    private http: HttpClient,
    private locationStore: LocationStore,
    private weatherStore: WeatherStore,
    private forecastStore: ForecastStore,
    private dataStorageService: DataStorageService,
    private ForecastQuery: ForecastQuery,
    private locationQuery: LocationQuery,
    private weatherQuery: WeatherQuery,
  ) { }

  searchLocation(query: string): Observable<LocationData[]> {
    if (!query || query.length < 3) {
      return of([]);
    }
    const storedCities: LocationData[] = this.dataStorageService.getData(this.STORAGE_KEYS.cities);
    if (storedCities && storedCities.length > 0) {
      const filtered = storedCities.filter((location) =>
        location.LocalizedName?.toLowerCase()?.includes(query?.toLowerCase())
      );

      if (filtered.length > 0) {
        const filteredLC = this.locationQuery.getAll({
          limitTo: 10,
          filterBy: entity => entity.id.toLowerCase().includes(query)
        }).map(lc => lc.locationData);

        if (filteredLC.length > 0) {
          return of(filteredLC);
        } else {
          filtered.forEach((f) => {
            this.locationStore.add({
              id: f.LocalizedName,
              locationData: f
            });
          });
          return of(filtered.map(f => f));
        }
      }
    }

    return this.fetchCitiesFromAPI(query);
  }

  fetchCitiesFromAPI(query: string): Observable<LocationData[]> {
    const params = { apikey: this.apiKey, q: query };
    const endpoint = `${this.apiUrl}/locations/v1/cities/autocomplete`;
    let fetchedData$ = this.http.get<LocationData[]>(endpoint, { params });
    return fetchedData$.pipe(take(1), tap((ld) => {
      this.dataStorageService.saveCitiesData(query, ld)
      // this.locationStore.set([]);
      ld.forEach((location) => {
        let currLocation: Location = { locationData: location, id: location.LocalizedName }
        this.locationStore.add([currLocation])
      });
    }),
      map((x) => {
        const locationQueryData = this.locationQuery.getAll({
          limitTo: 10,
          filterBy: entity =>
            entity.id.toLowerCase().includes(query)
        })
        return locationQueryData.map(lqd => lqd.locationData);
      })
    )
  }

  getWeatherDetails(locationKey: string): Observable<WeatherData> {
    const storedWeather: Weather[] = this.dataStorageService.getData(this.STORAGE_KEYS.weatherData);
    if (storedWeather && storedWeather.length > 0) {
      const filtered = storedWeather.find((sw) =>
        sw.id === locationKey);
      if (filtered) {
        const weatherDetails = this.weatherQuery.getAll(
          {
            limitTo: 10,
            filterBy: entity => entity.id === locationKey
          });
        if (weatherDetails && weatherDetails.length > 0) {
          return of(weatherDetails.map(wd => wd.weatherData)[0])
        }
        else {
          this.weatherStore.set([filtered]);
          const weatherDetails = this.weatherQuery.getAll(
            {
              limitTo: 10,
              filterBy: entity => entity.id === locationKey
            });
          const wd = weatherDetails.map(wd => wd.weatherData)[0]
          return of(wd)
        }
      }
    }
    return this.fetchWeather(locationKey)
  }

  fetchWeather(locationKey: string): Observable<WeatherData> {
    const endpoint = `${this.apiUrl}/currentconditions/v1/${locationKey}`;
    const params = { apikey: this.apiKey };
    return this.http.get<WeatherData[]>(endpoint, { params }).pipe(
      map(x => x[0]),
      tap((newWeatherData) => {
        const updatedWeatherObject = { weatherData: newWeatherData, id: locationKey };
        this.dataStorageService.saveWeatherOrForecast(this.STORAGE_KEYS.weatherData, updatedWeatherObject, null);
        this.weatherStore.add(updatedWeatherObject);
        let weatherData = (this.weatherQuery.getEntity(locationKey))?.weatherData
        return of(weatherData)
      }
      ),
      catchError(this.handleError)
    );
  }

  getForecast(locationKey: string): Observable<any> {
    const storedForecast: Forecast[] = this.dataStorageService.getData(this.STORAGE_KEYS.forecastData);
    if (storedForecast && storedForecast.length > 0) {
      const filtered = storedForecast.find((sf) =>
        sf.id === locationKey);
      if (filtered) {
        const forecastDetails = this.ForecastQuery.getAll();
        if (forecastDetails.length > 0) {
          const isExist = forecastDetails.filter(x => x.id === locationKey);
          if (isExist && isExist.length) {
            return of(isExist[0]?.forecastData)
          }
        }
        else {
          this.forecastStore.set([filtered]);
          const forecastDetails = this.ForecastQuery.getAll(
            {
              limitTo: 10,
              filterBy: entity => entity.id === locationKey
            });
          return of(forecastDetails[0].forecastData)
        }
      }
    }
    return this.fetchForecast(locationKey)
  }


  fetchForecast(locationKey: string): Observable<any> {
    const endpoint = `${this.apiUrl}/forecasts/v1/daily/5day/${locationKey}`;
    const params = { apikey: this.apiKey };
    return this.http.get<any>(endpoint, { params }).pipe(
      tap((newForecastData) => {
        const updatedForecastObject = { forecastData: newForecastData, id: locationKey };
        this.forecastStore.set([updatedForecastObject]);
        this.dataStorageService.saveWeatherOrForecast('forecastData', null, updatedForecastObject);
        let forecastData = (this.ForecastQuery.getEntity(locationKey))
        return of(forecastData)
      }
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error making API call', error);
    return throwError(error);
  }
}


