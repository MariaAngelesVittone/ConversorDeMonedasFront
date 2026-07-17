import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../Services/currency.service';
import { ProfileService } from '../../Services/profile.service';
import { Currency } from '../../Interfaces/currency';
import { UserProfile } from '../../Interfaces/userProfile';
import { SubscriptionPlansComponent } from '../../Shared/subscription-plans/subscription-plans.component';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, DecimalPipe, SubscriptionPlansComponent],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  fromCode: number | null = null;
  toCode: number | null = null;
  amount: number | null = null;

  result: number | null = null;
  errorMessage: string | null = null;
  loading = false;
  outOfConversions = false;
  showPlanPopup = false;
  currentSubscriptionType = 0;

  constructor(public currencyService: CurrencyService, private profileService: ProfileService) {}

  async ngOnInit() {
    await this.currencyService.getCurrencies();
    await this.refreshProfile();
  }

  private async refreshProfile() {
    const profile = await this.profileService.getMyProfile();
    if (profile) {
      this.currentSubscriptionType = profile.subscriptionType;
      this.outOfConversions = !profile.canConvert;
      if (this.outOfConversions) this.showPlanPopup = true;
    }
  }

  get currencies(): Currency[] {
    return this.currencyService.currencies;
  }

  swapCurrencies() {
    [this.fromCode, this.toCode] = [this.toCode, this.fromCode];
    this.result = null;
    this.errorMessage = null;
  }

  async onSubmit() {
    this.errorMessage = null;
    this.result = null;

    if (this.fromCode === null || this.toCode === null || this.amount === null) {
      return;
    }

    this.loading = true;

    const response = await this.currencyService.convertCurrency({
      fromCurrencyCode: this.fromCode,
      toCurrencyCode: this.toCode,
      amount: this.amount,
    });

    this.loading = false;

    if (!response.ok) {
      this.errorMessage = response.message ?? 'No se pudo realizar la conversión.';
      this.outOfConversions = this.errorMessage.includes('No se pueden realizar mas conversiones');
      if (this.outOfConversions) this.showPlanPopup = true;
      return;
    }

    this.outOfConversions = false;
    this.result = response.result ?? null;
  }

  openPlanPopup() {
    this.showPlanPopup = true;
  }

  closePlanPopup() {
    this.showPlanPopup = false;
  }

  onPlanChanged(updated: UserProfile) {
    this.currentSubscriptionType = updated.subscriptionType;
    this.outOfConversions = !updated.canConvert;
    this.showPlanPopup = false;
  }
}
