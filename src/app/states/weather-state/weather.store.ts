// forecasts-store.service.ts
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Weather } from './weather.model';

export interface WeatherState extends EntityState<Weather> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'weather', idKey: 'id' })
export class WeatherStore extends EntityStore<WeatherState, Weather> {
  constructor() {
    super();
  }
}
