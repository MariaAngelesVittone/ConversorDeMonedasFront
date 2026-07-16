import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { SignUp } from '../../Interfaces/sign-up';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpData: SignUp = { email: '', username: '', password: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  async onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.loading = true;

    const result = await this.userService.signUp(this.signUpData);

    this.loading = false;

    if (!result.ok) {
      this.errorMessage = result.message ?? 'No se pudo crear el usuario.';
      return;
    }

    this.successMessage = 'Cuenta creada con éxito. Ya podés iniciar sesión.';
    setTimeout(() => this.router.navigate(['/login']), 1200);
  }
}
