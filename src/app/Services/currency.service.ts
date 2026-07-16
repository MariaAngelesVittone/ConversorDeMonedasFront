import { Injectable } from '@angular/core';
import { Currency } from '../Interfaces/currency';
import { environment } from '../Environments/environment.development';
import { CurrencyConversion } from '../Interfaces/conversion';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencies: Currency[] = [];

  constructor() {
    this.loadData();
  }

  async loadData() {
    await this.getCurrencies();
  }

  async getCurrencies() {
    try {
      const res = await fetch(environment.API_URL + 'Currency');
      if (res.status !== 200) {
        this.currencies = [];
        return;
      }
      const resJson: Currency[] = await res.json();
      this.currencies = resJson;
    } catch (error) {
      console.error('Error al obtener las monedas:', error);
      this.currencies = [];
    }
  }

  async convertCurrency(
    dto: CurrencyConversion
  ): Promise<{ ok: boolean; result?: number; message?: string }> {
    try {
      const response = await fetch(`${environment.API_URL}Currency/conversion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('authToken'),
        },
        body: JSON.stringify(dto),
      });

      if (response.status === 200) {
        const result: number = await response.json();
        return { ok: true, result };
      }

      // Los errores del backend vienen como text/plain, no JSON.
      const message = await response.text().catch(() => 'No se pudo realizar la conversión.');
      return { ok: false, message: message.replace(/^"|"$/g, '') || 'No se pudo realizar la conversión.' };
    } catch (error) {
      console.error('Error en el proceso de conversión:', error);
      return { ok: false, message: 'No se pudo conectar con el servidor.' };
    }
  }
}
