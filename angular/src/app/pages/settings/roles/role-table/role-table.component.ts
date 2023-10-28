import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';
import { RoleFormComponent } from '../role-form/role-form.component';

@Component({
  selector: 'role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss'],
})
export class RoleTableComponent {
  allRoles: Roles[] = [];
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.getAllRoles();
  }

  onEdit(data) {
    const dialogPosition = {
      top: 30 + 'px',
    };

    const config = {
      height: '40vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      position: dialogPosition,
      data: data,
    };
    const dialogRef = this.dialog.open(RoleFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllRoles();
    });
  }

  getAllRoles() {
    const url = `/settings/getRoles`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.allRoles = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  onAddRole() {
    const dialogPosition = {
      top: 30 + 'px',
    };

    const config = {
      height: '40vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      position: dialogPosition,
      data: null,
    };
    const dialogRef = this.dialog.open(RoleFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllRoles();
    });
  }
}
