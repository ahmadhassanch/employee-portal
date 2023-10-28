import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name = new FormControl(null, Validators['required']);
  password = new FormControl(null, Validators['required']);
  iswrongCredentials = false;

  keyDown$: Observable<any> = fromEvent(document, 'keydown');
  subscription: Subscription;

  constructor(
    private router: Router,
    public http: HttpClient,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // if (this.isUserLOggdIn()) this.navigateToDatsboard();
    this.subscribeKeyEvents();
  }

  subscribeKeyEvents() {
    this.subscription = this.keyDown$.subscribe((ev) => {
      if (ev.key === 'Enter' && this.name.valid && this.password.valid) {
        ev.preventDefault();
        this.onSubmit();
      }
    });
  }

  isUserLOggdIn() {
    let user = localStorage.getItem('user');
    return user ? true : false;
  }

  onSubmit() {
    console.log('... submit');

    const payload = {
      userName: this.name.value,
      password: this.password.value,
    };
    const url = `/auth/logIn`;
    this.dataService.post(url, payload).then(
      (resp: any) => {
        console.log('to dashboard');
        this.navigateToDatsboard();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  navigateToDatsboard() {
    this.router.navigateByUrl('/portal/main/dashboard');
  }
}
