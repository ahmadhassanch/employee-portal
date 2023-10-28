import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'portal',
    loadChildren: () =>
      import('../app/pages/pages-module.module').then(
        (p) => p.PagesModuleModule
      ),
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: 'portal/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
