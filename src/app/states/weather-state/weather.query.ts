import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WeatherState, WeatherStore } from './weather.store';

@Injectable({
  providedIn: 'root',
})

export class WeatherQuery extends QueryEntity<WeatherState> {

  constructor(protected override store: WeatherStore) {
    super(store);
  }
}
