import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';

export function APP_INITIALIZER_PROVIDER_FACTORY(config: DataService) {
  return () => config.getSession();
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public userProfile: any;
  public permissions: any;
  constructor(private http: HttpClient, private router: Router) {}

  post(url: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.post('/api' + url, payload)).then(
        (res: any) => {
          if (this.logInCheck(url)) {
            this.managSession(res);
          }
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        }
      );
    });
  }

  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.get('/api' + url)).then(
        (res: any) => {
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        }
      );
    });
  }

  patch(url: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.patch('/api' + url, payload)).then(
        (res: any) => {
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        }
      );
    });
  }

  getById(url: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let updatedUrl = url + '/' + payload.id;

      lastValueFrom(this.http.get('/api' + updatedUrl)).then(
        (res: any) => {
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        }
      );
    });
  }

  logInCheck(url) {
    if (url.substring(url.lastIndexOf('/') + 1) == 'logIn') return true;
    else return false;
  }

  managSession(data: any) {
    localStorage.setItem('token', JSON.stringify(data['profile']['token']));
    this.userProfile = data['profile'];
    this.permissions = data['permissions'];
  }

  updateSession(data) {
    this.userProfile.attendenceDate = data.attendenceDate;
    this.userProfile.checkInTime = data.checkInTime;
  }

  getSession() {
    const url = `/auth/session`;
    let token = localStorage.getItem('token');
    if (!token) token = null;

    this.post(url, { token }).then(
      (resp: any) => {
        if (!resp.session) {
          this.router.navigateByUrl('/login');
        } else {
          this.userProfile = resp['profile'];
          this.permissions = resp['permissions'];
          // this.router.navigateByUrl('/portal/main/dashboard');
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get('/api' + imageUrl, { responseType: 'blob' });
  }
}
