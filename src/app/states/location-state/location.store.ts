// forecasts-store.service.ts
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Location } from './location.model'

export interface LocationState extends EntityState<Location> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'location', idKey: 'id' })
export class LocationStore extends EntityStore<LocationState, Location> {
  constructor() {
    super();
  }
}
