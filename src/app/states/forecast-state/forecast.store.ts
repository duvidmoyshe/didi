// forecasts-store.service.ts
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Forecast, ForecastData } from './forecast.model';

export interface ForecastState extends EntityState<Forecast> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'forecast', idKey: 'id' })
export class ForecastStore extends EntityStore<ForecastState, Forecast> {
  constructor() {
    super();
  }
}
