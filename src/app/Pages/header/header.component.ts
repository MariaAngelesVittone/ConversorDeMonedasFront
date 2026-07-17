import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { ConfirmDialogComponent } from '../../Shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ConfirmDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  confirmingLogout = false;

  constructor(public authService: AuthenticationService, private router: Router) {}

  requestLogout() {
    this.confirmingLogout = true;
  }

  confirmLogout() {
    this.confirmingLogout = false;
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  cancelLogout() {
    this.confirmingLogout = false;
  }
}
