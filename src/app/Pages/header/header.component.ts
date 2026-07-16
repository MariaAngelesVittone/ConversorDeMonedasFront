import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public authService: AuthenticationService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
