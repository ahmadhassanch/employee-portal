import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Report } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';
import { ReportFormComponent } from './reports-form/reports-form.component';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportComponent {
  reportData: Report[] = [];

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getUserReports();
  }

  createReport() {
    const dialogPosition = {
      top: 30 + 'px',
    };

    const config = {
      height: '50vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      position: dialogPosition,
      data: null,
    };
    const dialogRef = this.dialog.open(ReportFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.getUserReports();
    });
  }

  onEdit(item) {
    const dialogPosition = {
      top: 30 + 'px',
    };

    const config = {
      height: '50vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      position: dialogPosition,
      data: item,
    };
    const dialogRef = this.dialog.open(ReportFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.getUserReports();
    });
  }

  getUserReports() {
    const url = `/reports/getUserReport`;
    let user = this.dataService.userProfile['userId'];

    let payload = {
      id: user,
    };

    this.dataService.getById(url, payload).then(
      (resp: any) => {
        this.reportData = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
