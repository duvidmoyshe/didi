import { Injectable } from '@angular/core';
import { FavoritesStore } from './favorites.store';
import { Favorite } from './favorites.model';
import { FavoritesQuery } from './favorites.query';
import { BehaviorSubject, Observable, Subject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  private currentFavoriteSub = new BehaviorSubject<Favorite | null>(null);
  currentFavorite = this.currentFavoriteSub.asObservable();

  constructor(
    private favoritesStore: FavoritesStore,
    private favoritesQuery: FavoritesQuery) {
  }

  updateFavorite(favorite: Favorite) {
    this.favoritesStore.update({ favorite })
  }

  getAllFavorites() {
    return this.favoritesQuery.getAll()
  }

  addFavorite(favorite: Favorite) {
    this.favoritesStore.add(favorite)
  }

  getFavorite(id: string): Favorite | unknown {
    return this.favoritesQuery.getEntity(id)
  }

  removeFavorite(id: string) {
    return this.favoritesStore.remove(id)
  }

  resetFavorites() {
    this.favoritesStore.reset();
  }

  updateFavoriteSub(favorite: Favorite) {
     this.currentFavoriteSub.next(favorite)
  }
}
