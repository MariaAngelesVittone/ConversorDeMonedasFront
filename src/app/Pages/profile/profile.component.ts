import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../Services/profile.service';
import { UserProfile } from '../../Interfaces/userProfile';
import { SubscriptionPlansComponent, PLANS } from '../../Shared/subscription-plans/subscription-plans.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SubscriptionPlansComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = true;
  successMessage: string | null = null;

  constructor(private profileService: ProfileService) {}

  async ngOnInit() {
    this.profile = await this.profileService.getMyProfile();
    this.loading = false;
  }

  onPlanChanged(updated: UserProfile) {
    this.profile = updated;
    const plan = PLANS.find((p) => p.type === updated.subscriptionType);
    this.successMessage = `Ahora tenés el plan ${plan?.name ?? ''}.`;
  }
}
