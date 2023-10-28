import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material_module/material.module';
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const login_routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'welcome',
        component: SplashScreenComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'main',
        loadChildren: () =>
          import('../main/main.module').then((m) => m.MainModule),
      },
    ],
  },
];
@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterComponent,
    AuthComponent,
    SplashScreenComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(login_routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthModule {}
