import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/common/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  goToRegister() {
    console.log('Clicked');
    this.router.navigate(['register']);
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.toastService.showSuccessMessage('Login successful!');
      this.router.navigate(['main']);
    } else {
      this.toastService.showSuccessMessage('Login Failed!');
    }
  }
}
