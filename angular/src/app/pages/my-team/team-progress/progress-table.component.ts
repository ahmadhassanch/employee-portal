import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TeamProgress } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'progress-table',
  templateUrl: './progress-table.component.html',
  styleUrls: ['./progress-table.component.scss'],
})
export class ProgressTableComponent {
  teamProgress: TeamProgress[] = [];
  userId: string = null;

  progressDate = new FormControl('');
  progresstDateFilter: number;

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    let currentDate = new Date();
    this.userId = this.dataService.userProfile.userId;
    this.progressDate.setValue(currentDate);
    this.progresstDateFilter = Math.floor(this.progressDate.value / 1000);
    this.getTeamProgress();

    this.progressDate.valueChanges.subscribe((value) => {
      this.progresstDateFilter = Math.floor(value / 1000);

      this.getTeamProgress();
    });
  }

  getTeamProgress() {
    const url = `/team/getTeamProgress?userId=${this.userId}&progressDate=${this.progresstDateFilter}`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.teamProgress = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
