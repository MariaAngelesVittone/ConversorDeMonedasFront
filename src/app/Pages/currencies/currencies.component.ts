import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../Services/favorites.service';
import { CurrencyWithFavorite } from '../../Interfaces/favoriteCurrency';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent implements OnInit {
  currencies: CurrencyWithFavorite[] = [];
  loading = true;

  constructor(private favoritesService: FavoritesService) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    this.loading = true;
    this.currencies = await this.favoritesService.getAllWithFavorites();
    this.loading = false;
  }

  async toggleFavorite(currency: CurrencyWithFavorite) {
    const ok = currency.isFavorite
      ? await this.favoritesService.removeFavorite(currency.code)
      : await this.favoritesService.markAsFavorite(currency.code);

    if (ok) {
      currency.isFavorite = !currency.isFavorite;
      this.currencies = [...this.currencies].sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
    }
  }
}
