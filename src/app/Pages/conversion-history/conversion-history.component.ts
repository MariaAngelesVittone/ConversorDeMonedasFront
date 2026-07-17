import { Component, OnInit } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { HistoryService } from '../../Services/history.service';
import { CurrencyService } from '../../Services/currency.service';
import { ConversionHistoryItem } from '../../Interfaces/conversionHistory';

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './conversion-history.component.html',
  styleUrl: './conversion-history.component.scss',
})
export class ConversionHistoryComponent implements OnInit {
  history: ConversionHistoryItem[] = [];
  loading = true;

  constructor(private historyService: HistoryService, public currencyService: CurrencyService) {}

  async ngOnInit() {
    await this.currencyService.getCurrencies();
    this.history = await this.historyService.getHistory();
    this.loading = false;
  }

  currencyLabel(code: number): string {
    return this.currencyService.currencies.find((c) => c.code === code)?.leyend ?? `#${code}`;
  }
}
