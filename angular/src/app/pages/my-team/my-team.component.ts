import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
})
export class MyteamComponent {
  teamMembers: User[] = [];
  userId: string = null;

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.userId = this.dataService.userProfile.userId;
    this.getTeamMembers();
  }

  getTeamMembers() {
    const url = `/team/getTeamMembers/${this.userId}`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.teamMembers = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
