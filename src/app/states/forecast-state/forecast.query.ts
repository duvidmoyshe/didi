import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ForecastState, ForecastStore } from './forecast.store';

@Injectable({
  providedIn: 'root',
})

export class ForecastQuery extends QueryEntity<ForecastState> {

  constructor(protected override store: ForecastStore) {
    super(store);
  }
}
