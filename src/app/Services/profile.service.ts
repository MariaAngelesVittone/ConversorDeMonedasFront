import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { UserProfile } from '../Interfaces/userProfile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private authHeaders() {
    return {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('authToken'),
    };
  }

  async getMyProfile(): Promise<UserProfile | null> {
    try {
      const res = await fetch(environment.API_URL + 'User/me', {
        headers: this.authHeaders(),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      return null;
    }
  }

  async updateSubscription(subscriptionType: number): Promise<UserProfile | null> {
    try {
      const res = await fetch(environment.API_URL + 'User/subscription', {
        method: 'PUT',
        headers: this.authHeaders(),
        body: JSON.stringify(subscriptionType),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Error al cambiar la suscripcion:', error);
      return null;
    }
  }
}
