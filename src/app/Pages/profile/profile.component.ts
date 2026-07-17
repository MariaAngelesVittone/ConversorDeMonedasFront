import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../Services/profile.service';
import { UserProfile } from '../../Interfaces/userProfile';
import { ConfirmDialogComponent } from '../../Shared/confirm-dialog/confirm-dialog.component';

interface PlanInfo {
  type: number;
  name: string;
  description: string;
  confirmMessage: string;
}

const PLANS: PlanInfo[] = [
  {
    type: 0,
    name: 'Free',
    description: 'Hasta 10 conversiones por mes. El plan con el que arrancan todas las cuentas.',
    confirmMessage: 'Al cambiar a Free vas a tener hasta 10 conversiones por mes. ¿Confirmás el cambio?',
  },
  {
    type: 1,
    name: 'Trial',
    description: '100 conversiones gratis por mes.',
    confirmMessage: 'Al cambiar a Trial vas a tener 100 conversiones gratis por mes. ¿Confirmás el cambio?',
  },
  {
    type: 2,
    name: 'Pro',
    description: 'Conversiones ilimitadas. Plan pago (simulado: no se realiza ningún cobro real).',
    confirmMessage:
      'Pro es un plan pago con conversiones ilimitadas. Esta es una simulación: no se te va a cobrar nada ni se te va a redirigir a ningún lado a pagar. ¿Confirmás el cambio?',
  },
];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ConfirmDialogComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = true;
  plans = PLANS;

  pendingPlan: PlanInfo | null = null;
  successMessage: string | null = null;

  constructor(private profileService: ProfileService) {}

  async ngOnInit() {
    this.profile = await this.profileService.getMyProfile();
    this.loading = false;
  }

  requestChange(plan: PlanInfo) {
    this.successMessage = null;
    this.pendingPlan = plan;
  }

  async onConfirmChange() {
    if (!this.pendingPlan) return;

    const updated = await this.profileService.updateSubscription(this.pendingPlan.type);
    if (updated) {
      this.profile = updated;
      this.successMessage = `Ahora tenés el plan ${this.pendingPlan.name}.`;
    }
    this.pendingPlan = null;
  }

  onCancelChange() {
    this.pendingPlan = null;
  }
}
