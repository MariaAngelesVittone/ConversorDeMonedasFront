import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment.development';
import { SignUp } from '../Interfaces/sign-up';
import { UserResponse } from '../Interfaces/userResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async signUp(signUpData: SignUp): Promise<{ ok: boolean; message?: string; user?: UserResponse }> {
    try {
      const response = await fetch(`${environment.API_URL}User/CreateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        const user: UserResponse = await response.json();
        return { ok: true, user };
      }

      // Los errores del backend vienen como text/plain, no JSON.
      const message = await response.text().catch(() => 'No se pudo crear el usuario.');
      return { ok: false, message: message.replace(/^"|"$/g, '') || 'No se pudo crear el usuario.' };
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      return { ok: false, message: 'No se pudo conectar con el servidor.' };
    }
  }
}
