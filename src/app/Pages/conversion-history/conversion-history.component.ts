import { Component, OnInit } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { HistoryService } from '../../Services/history.service';
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

  constructor(private historyService: HistoryService) {}

  async ngOnInit() {
    this.history = await this.historyService.getHistory();
    this.loading = false;
  }

  currencyLabel(leyend: string): string {
    return leyend || 'Moneda eliminada';
  }
}
