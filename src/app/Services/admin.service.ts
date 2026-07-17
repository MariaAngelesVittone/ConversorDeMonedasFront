import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { AdminUser } from '../Interfaces/adminUser';
import { Currency } from '../Interfaces/currency';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private authHeaders() {
    return {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };
  }

  async getUsers(): Promise<AdminUser[]> {
    try {
      const res = await fetch(environment.API_URL + 'AdminUser', {
        headers: this.authHeaders(),
      });
      if (res.status !== 200) return [];
      return await res.json();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  async updateSubscription(userId: number, subscriptionType: number): Promise<boolean> {
    try {
      const res = await fetch(`${environment.API_URL}AdminUser/${userId}/subscription`, {
        method: 'PUT',
        headers: this.authHeaders(),
        body: JSON.stringify(subscriptionType),
      });
      return res.ok;
    } catch (error) {
      console.error('Error al actualizar la suscripcion:', error);
      return false;
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    try {
      const res = await fetch(`${environment.API_URL}AdminUser/${userId}`, {
        method: 'DELETE',
        headers: this.authHeaders(),
      });
      return res.ok;
    } catch (error) {
      console.error('Error al dar de baja el usuario:', error);
      return false;
    }
  }

  async createCurrency(dto: {
    codigo: number;
    leyenda: string;
    simbolo?: string;
    idc: number;
  }): Promise<{ ok: boolean; message?: string; currency?: Currency }> {
    try {
      const res = await fetch(environment.API_URL + 'Currency', {
        method: 'POST',
        headers: this.authHeaders(),
        body: JSON.stringify(dto),
      });
      if (res.ok) {
        return { ok: true, currency: await res.json() };
      }
      const message = await res.text().catch(() => 'No se pudo crear la moneda.');
      return { ok: false, message: message.replace(/^"|"$/g, '') || 'No se pudo crear la moneda.' };
    } catch (error) {
      console.error('Error al crear la moneda:', error);
      return { ok: false, message: 'No se pudo conectar con el servidor.' };
    }
  }

  async updateCurrency(
    code: number,
    dto: { leyenda: string; idc: number }
  ): Promise<{ ok: boolean; message?: string; currency?: Currency }> {
    try {
      const res = await fetch(`${environment.API_URL}Currency/${code}`, {
        method: 'PUT',
        headers: this.authHeaders(),
        body: JSON.stringify(dto),
      });
      if (res.ok) {
        return { ok: true, currency: await res.json() };
      }
      const message = await res.text().catch(() => 'No se pudo actualizar la moneda.');
      return { ok: false, message: message.replace(/^"|"$/g, '') || 'No se pudo actualizar la moneda.' };
    } catch (error) {
      console.error('Error al actualizar la moneda:', error);
      return { ok: false, message: 'No se pudo conectar con el servidor.' };
    }
  }

  async deleteCurrency(code: number): Promise<boolean> {
    try {
      const res = await fetch(`${environment.API_URL}Currency/${code}`, {
        method: 'DELETE',
        headers: this.authHeaders(),
      });
      return res.ok;
    } catch (error) {
      console.error('Error al eliminar la moneda:', error);
      return false;
    }
  }
}
