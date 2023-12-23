import { Injectable } from '@angular/core';
import { ForecastStore } from './forecast.store';

@Injectable({
  providedIn: 'root',
})

export class ForecastService {

  constructor(private  store: ForecastStore) {

  }
}
