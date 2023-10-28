import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((p) => p.AuthModule),
    // import('./pages/main/main.module').then((p) => p.MainModule),
  },
  {
    path: 'table',
    loadChildren: () =>
      // import('./pages/auth/auth.module').then((p) => p.AuthModule),
      import('./pages/main/main.module').then((p) => p.MainModule),
  },
  {
    path: 'table-direct',
    loadChildren: () =>
      // import('./pages/auth/auth.module').then((p) => p.AuthModule),
      import('./shared/cc-general-table/cc-general-table.module').then(
        (p) => p.CCGeneralTableModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
