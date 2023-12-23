// weather-details-store.service.ts
import { Injectable } from '@angular/core';
import { EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Favorite } from './favorites.model';

export interface FavoritesState {
  favorite: Favorite;
}
export function createInitialState(): FavoritesState {
  return {
    favorite: {
      id: '',
      favoriteName: '',
      weatherData: {
        EpochTime: 0,
        HasPrecipitation: false,
        IsDayTime: false,
        Link: '',
        LocalObservationDateTime: '',
        MobileLink: '',
        PrecipitationType: '',
        Temperature: {
          Metric: {
            Value: 0,
            Unit: '',
            UnitType: 0
          },
          Imperial: {
            Value: 0,
            Unit: '',
            UnitType: 0
          }
        },
        WeatherIcon: 0,
        WeatherText: ''
      }
    }
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'favorites', resettable: true })
export class FavoritesStore extends EntityStore<FavoritesState, Favorite> {
  constructor() {
    super(createInitialState());
  }
}
