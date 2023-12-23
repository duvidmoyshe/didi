import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LocationState, LocationStore } from './location.store';

@Injectable({
  providedIn: 'root',
})

export class LocationQuery extends QueryEntity<LocationState> {

  constructor(protected override store: LocationStore) {
    super(store);
  }
}
