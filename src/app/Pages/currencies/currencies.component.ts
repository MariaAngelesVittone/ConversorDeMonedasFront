import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../Services/currency.service';
import { Currency } from '../../Interfaces/currency';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent implements OnInit {
  constructor(public currencyService: CurrencyService) {}

  async ngOnInit() {
    await this.currencyService.getCurrencies();
  }

  get currencies(): Currency[] {
    return this.currencyService.currencies;
  }
}
