import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { ConverterComponent } from './Pages/converter/converter.component';
import { CurrenciesComponent } from './Pages/currencies/currencies.component';
import { ConversionHistoryComponent } from './Pages/conversion-history/conversion-history.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { soloLoggedGuard } from './Guards/solo-logged.guard';
import { soloPublicoGuard } from './Guards/solo-publico.guard';
import { soloAdminGuard } from './Guards/solo-admin.guard';

export const routes: Routes = [
  {
    path: 'converter',
    component: ConverterComponent,
    canActivate: [soloLoggedGuard],
  },
  {
    path: 'currencies',
    component: CurrenciesComponent,
    canActivate: [soloLoggedGuard],
  },
  {
    path: 'conversion-history',
    component: ConversionHistoryComponent,
    canActivate: [soloLoggedGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [soloAdminGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [soloLoggedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [soloPublicoGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [soloPublicoGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
