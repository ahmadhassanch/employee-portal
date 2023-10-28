import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AttendenceData } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'team-attendence',
  templateUrl: './team-attendence.component.html',
  styleUrls: ['./team-attendence.component.scss'],
})
export class TeamAttendenceComponent {
  teamAttendence: AttendenceData[] = [];
  userId: string = null;
  attendenceDate = new FormControl('');
  attendenceDateFilter: number;

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    let currentDate = new Date();
    this.userId = this.dataService.userProfile.userId;
    this.attendenceDate.setValue(currentDate);
    this.attendenceDateFilter = Math.floor(this.attendenceDate.value / 1000);
    this.getTeamAttendence();

    this.attendenceDate.valueChanges.subscribe((value) => {
      this.attendenceDateFilter = Math.floor(value / 1000);

      this.getTeamAttendence();
    });
  }

  getTeamAttendence() {
    const url = `/team/getTeamAttendence?userId=${this.userId}&attendenceDate=${this.attendenceDateFilter}`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.teamAttendence = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
