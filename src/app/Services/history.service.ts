import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { ConversionHistoryItem } from '../Interfaces/conversionHistory';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  async getHistory(): Promise<ConversionHistoryItem[]> {
    try {
      const res = await fetch(environment.API_URL + 'History', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('authToken'),
        },
      });
      if (res.status !== 200) return [];
      return await res.json();
    } catch (error) {
      console.error('Error al obtener el historial:', error);
      return [];
    }
  }
}
