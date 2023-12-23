import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FavoritesState, FavoritesStore } from './favorites.store';

@Injectable({
  providedIn: 'root',
})
export class FavoritesQuery extends QueryEntity<FavoritesState> {
  constructor(protected override store: FavoritesStore) {
    super(store);
  }

  // selectFavorite() {
  //   return this.select(state => state.favorite)
  // }

  // getFavorite() {
  //   return this.getValue();
  // }
}
