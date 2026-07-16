import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { Login } from '../../Interfaces/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials: Login = { username: '', password: '' };
  errorMessage: string | null = null;
  loading = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  async onSubmit() {
    this.errorMessage = null;
    this.loading = true;

    const error = await this.authService.login(this.credentials);

    this.loading = false;

    if (error) {
      this.errorMessage = error;
      return;
    }

    this.router.navigate(['/converter']);
  }
}
