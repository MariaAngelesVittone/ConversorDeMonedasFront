import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from '../../Services/profile.service';
import { UserProfile } from '../../Interfaces/userProfile';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export interface PlanInfo {
  type: number;
  name: string;
  description: string;
  confirmMessage: string;
}

export const PLANS: PlanInfo[] = [
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
    description: 'Conversiones ilimitadas. Plan pago.',
    confirmMessage: 'Pro es un plan pago con conversiones ilimitadas. ¿Confirmás el cambio?',
  },
];

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [ConfirmDialogComponent],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.scss',
})
export class SubscriptionPlansComponent {
  @Input() currentType!: number;
  @Output() changed = new EventEmitter<UserProfile>();

  plans = PLANS;
  pendingPlan: PlanInfo | null = null;

  constructor(private profileService: ProfileService) {}

  requestChange(plan: PlanInfo) {
    this.pendingPlan = plan;
  }

  async onConfirmChange() {
    if (!this.pendingPlan) return;

    const updated = await this.profileService.updateSubscription(this.pendingPlan.type);
    this.pendingPlan = null;

    if (updated) {
      this.changed.emit(updated);
    }
  }

  onCancelChange() {
    this.pendingPlan = null;
  }
}
