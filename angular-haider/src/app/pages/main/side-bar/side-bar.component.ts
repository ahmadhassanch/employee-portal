import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

import { menuListClass } from './index';
import { Menu } from './menu';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  selectedRout = 'dashboard';
  menu = new menuListClass();
  menuList: Menu[] = [];
  image: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

    this.makeMenu();
    this.setSelectedMenu();

  }

  makeMenu() {
    this.menu.menuList.forEach((element) => {
        this.menuList.push(element);
      
    });
  }

  onEdit() {
    
  }

  

  setSelectedMenu() {
    this.selectedRout = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
  }

  onLogOut() {}
}
