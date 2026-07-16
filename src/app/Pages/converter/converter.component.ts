import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../Services/currency.service';
import { Currency } from '../../Interfaces/currency';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  fromCode: number | null = null;
  toCode: number | null = null;
  amount: number | null = null;

  result: number | null = null;
  errorMessage: string | null = null;
  loading = false;

  constructor(public currencyService: CurrencyService) {}

  async ngOnInit() {
    await this.currencyService.getCurrencies();
  }

  get currencies(): Currency[] {
    return this.currencyService.currencies;
  }

  async onSubmit() {
    this.errorMessage = null;
    this.result = null;

    if (this.fromCode === null || this.toCode === null || this.amount === null) {
      return;
    }

    this.loading = true;

    const response = await this.currencyService.convertCurrency({
      fromCurrencyCode: this.fromCode,
      toCurrencyCode: this.toCode,
      amount: this.amount,
    });

    this.loading = false;

    if (!response.ok) {
      this.errorMessage = response.message ?? 'No se pudo realizar la conversión.';
      return;
    }

    this.result = response.result ?? null;
  }
}
