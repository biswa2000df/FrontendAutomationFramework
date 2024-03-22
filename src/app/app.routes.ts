import { Routes } from '@angular/router';
import { TableComponent } from './components/main-controller/table/table.component';
import { DataTableComponent } from './components/data-sheet/data-table/data-table.component';
import { ResultsComponent } from './components/results/results.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { AuthGaurdService } from './auth-gaurd.service';


export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'otp-validation', component: OtpPageComponent },
  { path: 'main-controller', component: TableComponent, canActivate: [AuthGaurdService] },
  { path: 'data-sheet', component: DataTableComponent, canActivate: [AuthGaurdService] },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGaurdService] }
];
