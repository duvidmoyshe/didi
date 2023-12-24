import { Injectable } from '@angular/core';
import { LocationStore } from './location.store';

@Injectable({
  providedIn: 'root',
})

export class LocationService {

  constructor(private store: LocationStore) {
  }
}
