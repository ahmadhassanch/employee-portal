import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/route-guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employees/employees-table/employee-table.component';
import { MainComponent } from './main/main.component';
import { MyteamComponent } from './my-team/my-team.component';
import { ReportComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'employees',
        component: EmployeeComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuard],
      },
      { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
      {
        path: 'team',
        component: MyteamComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
