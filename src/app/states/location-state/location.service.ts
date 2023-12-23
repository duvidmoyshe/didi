import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { LocationState, LocationStore } from './location.store';

@Injectable({
  providedIn: 'root',
})

export class LocationService extends NgEntityService<LocationState> {

  constructor(protected override store: LocationStore) {
    super(store);
  }
}
