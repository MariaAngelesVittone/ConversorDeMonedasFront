import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { CurrencyWithFavorite } from '../Interfaces/favoriteCurrency';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private authHeader() {
    return { authorization: 'Bearer ' + localStorage.getItem('authToken') };
  }

  async getAllWithFavorites(): Promise<CurrencyWithFavorite[]> {
    try {
      const res = await fetch(environment.API_URL + 'Favorites/all-with-favorites', {
        headers: this.authHeader(),
      });
      if (res.status !== 200) return [];
      return await res.json();
    } catch (error) {
      console.error('Error al obtener las monedas favoritas:', error);
      return [];
    }
  }

  async markAsFavorite(currencyCode: number): Promise<boolean> {
    try {
      const res = await fetch(`${environment.API_URL}Favorites/${currencyCode}`, {
        method: 'POST',
        headers: this.authHeader(),
      });
      return res.ok;
    } catch (error) {
      console.error('Error al marcar como favorita:', error);
      return false;
    }
  }

  async removeFavorite(currencyCode: number): Promise<boolean> {
    try {
      const res = await fetch(`${environment.API_URL}Favorites/${currencyCode}`, {
        method: 'DELETE',
        headers: this.authHeader(),
      });
      return res.ok;
    } catch (error) {
      console.error('Error al quitar de favoritas:', error);
      return false;
    }
  }
}
