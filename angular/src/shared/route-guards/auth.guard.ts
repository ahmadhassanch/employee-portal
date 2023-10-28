import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/service/data-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataService: DataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let found = false;
    let endPoint: string = state.url.substring(state.url.lastIndexOf('/') + 1);

    if (this.dataService.permissions?.hasOwnProperty(endPoint)) {
      found = true;
    }
    return found;
  }
}
