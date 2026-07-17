import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { DecodedToken, Login } from '../Interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  logueado: DecodedToken | null = null;

  constructor() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.logueado = this.parseJwt(token);
    }
  }

  async login(loginData: Login): Promise<string | null> {
    try {
      const response = await fetch(`${environment.API_URL}Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        // El backend devuelve el token como text/plain (sin comillas de JSON).
        const token = (await response.text()).replace(/^"|"$/g, '');
        localStorage.setItem('authToken', token);
        this.logueado = this.parseJwt(token);
        return null;
      }

      const errorMessage = await response.text().catch(() => 'Credenciales incorrectas.');
      return errorMessage.replace(/^"|"$/g, '') || 'Credenciales incorrectas.';
    } catch (error) {
      console.error('Error en el proceso de autenticación:', error);
      return 'No se pudo conectar con el servidor.';
    }
  }

  private parseJwt(token: string): DecodedToken {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.logueado = null;
  }

  get isLoggedIn(): boolean {
    return this.logueado !== null;
  }

  get username(): string | null {
    return this.logueado?.given_name ?? null;
  }

  get isAdmin(): boolean {
    return this.logueado?.Rol === 'True';
  }
}
