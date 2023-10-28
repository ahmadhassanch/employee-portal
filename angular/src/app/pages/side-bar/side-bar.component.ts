import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { Menu } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';
import { EmployeeFormComponent } from '../employees/employees-form/employees-form.component';
import { menuListClass } from './index';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  selectedRout = 'dashboard';
  menu = new menuListClass();
  menuList: Menu[] = [];
  userProfile = null;
  image: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userProfile = this.dataService.userProfile;

    this.makeMenu();
    this.setSelectedMenu();
    this.getImage(this.userProfile['profileImage']);

    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setSelectedMenu();
      });
  }

  makeMenu() {
    this.menu.menuList.forEach((element) => {
      // if (this.dataService.permissions.hasOwnProperty(element.rout)) {
      this.menuList.push(element);
      // }
    });
  }

  onEdit() {
    const dialogPosition = {
      top: 30 + 'px',
    };

    const config = {
      height: '90vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      position: dialogPosition,
      data: this.dataService.userProfile,
    };
    const dialogRef = this.dialog.open(EmployeeFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getImage(imageUrl) {
    this.dataService
      .getImage(`/uploads/getImage/${imageUrl}`)
      .subscribe((blob) => {
        let objectURL = URL.createObjectURL(blob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }

  setSelectedMenu() {
    this.selectedRout = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
  }

  onLogOut() {
    let user = this.dataService.userProfile['userId'];
    const payload = { userId: user };
    const url = `/auth/logOut`;
    this.dataService.post(url, payload).then(
      (resp: any) => {
        localStorage.removeItem('token');
        location.href = '/login';

        console.log(resp);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
