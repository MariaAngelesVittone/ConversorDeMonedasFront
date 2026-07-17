import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { CurrencyService } from '../../Services/currency.service';
import { AdminUser } from '../../Interfaces/adminUser';
import { Currency } from '../../Interfaces/currency';
import { SubscriptionTypeLabels } from '../../Interfaces/userResponse';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  users: AdminUser[] = [];
  currencies: Currency[] = [];
  subscriptionLabels = SubscriptionTypeLabels;
  subscriptionOptions = [0, 1, 2];

  newCurrency = { codigo: 0, leyenda: '', simbolo: '', idc: 0 };
  createError: string | null = null;
  createSuccess: string | null = null;

  editingCode: number | null = null;
  editForm = { leyenda: '', idc: 0 };
  editError: string | null = null;

  loading = true;

  constructor(private adminService: AdminService, private currencyService: CurrencyService) {}

  async ngOnInit() {
    await this.reload();
  }

  async reload() {
    this.loading = true;
    this.users = await this.adminService.getUsers();
    await this.currencyService.getCurrencies();
    this.currencies = this.currencyService.currencies;
    this.loading = false;
  }

  async changeSubscription(user: AdminUser, newType: number) {
    const result = await this.adminService.updateSubscription(user.id, newType);
    if (result.ok) {
      user.subscriptionType = newType;
      if (result.conversionLimit !== undefined) {
        user.conversionLimit = result.conversionLimit;
      }
    }
  }

  async deleteUser(user: AdminUser) {
    if (!confirm(`¿Dar de baja a ${user.username}?`)) return;
    const ok = await this.adminService.deleteUser(user.id);
    if (ok) {
      this.users = this.users.filter((u) => u.id !== user.id);
    }
  }

  async createCurrency() {
    this.createError = null;
    this.createSuccess = null;

    const result = await this.adminService.createCurrency(this.newCurrency);
    if (!result.ok) {
      this.createError = result.message ?? 'No se pudo crear la moneda.';
      return;
    }

    this.createSuccess = 'Moneda creada correctamente.';
    this.newCurrency = { codigo: 0, leyenda: '', simbolo: '', idc: 0 };
    await this.reload();
  }

  startEdit(currency: Currency) {
    this.editingCode = currency.code;
    this.editForm = { leyenda: currency.leyend, idc: currency.conversionRate };
    this.editError = null;
  }

  cancelEdit() {
    this.editingCode = null;
  }

  async saveEdit(code: number) {
    this.editError = null;
    const result = await this.adminService.updateCurrency(code, this.editForm);
    if (!result.ok) {
      this.editError = result.message ?? 'No se pudo actualizar la moneda.';
      return;
    }
    this.editingCode = null;
    await this.reload();
  }

  async deleteCurrency(currency: Currency) {
    if (!confirm(`¿Eliminar la moneda ${currency.leyend}?`)) return;
    const ok = await this.adminService.deleteCurrency(currency.code);
    if (ok) {
      this.currencies = this.currencies.filter((c) => c.code !== currency.code);
    }
  }
}
