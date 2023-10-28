import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/common/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        age: [null, Validators.required],
      },
      { validator: this.passwordMatchValidator() } // Apply the custom validator
    );
  }

  onRegister() {
    if (this.signupForm.valid) {
      this.toastService.showSuccessMessage('Login successful!');
      this.router.navigate(['main']);
    } else {
      this.toastService.showSuccessMessage('Login Failed!');
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
  }
}
