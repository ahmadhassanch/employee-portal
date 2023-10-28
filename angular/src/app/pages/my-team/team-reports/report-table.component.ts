import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Report } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';
import { WebSocketService } from 'src/service/web-socket.service';

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent {
  teamReports: Report[] = [];
  userId: string = null;

  reportDate = new FormControl('');
  reportDateFilter: number;

  // public users: number = 0;
  // public message: string = '';
  // public messages: string[] = [];
  constructor(
    public dialog: MatDialog,
    private dataService: DataService // private chatService: WebSocketService
  ) {}

  ngOnInit() {
    let currentDate = new Date();
    this.userId = this.dataService.userProfile.userId;
    this.reportDate.setValue(currentDate);
    this.reportDateFilter = Math.floor(this.reportDate.value / 1000);
    this.getTeamReports();

    // this.chatService.receiveChat().subscribe((message: string) => {
    //   this.messages.push(message);
    // });

    // this.chatService.getUsers().subscribe((users: number) => {
    //   this.users = users;
    // });

    this.reportDate.valueChanges.subscribe((value) => {
      this.reportDateFilter = Math.floor(value / 1000);

      this.getTeamReports();
    });
  }

  // addChat() {
  //   this.messages.push(this.message);
  //   this.chatService.sendChat(this.message);
  //   this.message = '';
  // }

  getTeamReports() {
    const url = `/team/getTeamReports?userId=${this.userId}&reportDate=${this.reportDateFilter}`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.teamReports = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
