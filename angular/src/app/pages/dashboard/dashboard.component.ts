import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AttendenceData, SubTasks } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';
import { TaskTrackFormComponent } from './task-track/task-track-form.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedView = 'Items';

  counter: number;
  timerRef;
  running: boolean = false;
  startText = 'Start';
  hours = 0;
  minutes = 0;
  seconds = 0;
  checkedIn = false;
  attendenceData: AttendenceData[] = [];
  subTasks: SubTasks[] = [];
  activeTask = null;
  isAnyActiveTask = false;

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    let checkedInTime = this.dataService.userProfile['checkInTime'];
    if (checkedInTime) {
      this.startTimer(parseInt(checkedInTime));
      this.checkedIn = true;
    }
    this.getUserAttendence();
    this.getActiveTask();
  }

  checkIn() {
    let user = this.dataService.userProfile['userId'];

    const payload = {
      attendenceDate: Math.floor(Date.now() / 1000),
      checkInTime: Math.floor(Date.now() / 1000),
      checkOutTime: null,
      userId: user,
    };

    const url = `/attendence/checkIn`;
    this.dataService.post(url, payload).then(
      (resp: any) => {
        this.startTimer(resp.checkInTime);

        const payload = {
          attendenceDate: resp.attendenceDate,
          checkInTime: resp.checkInTime,
        };
        this.dataService.updateSession(payload);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  checkOut() {
    let user = this.dataService.userProfile['userId'];
    let attendenceDate = this.dataService.userProfile['attendenceDate'];
    attendenceDate = parseInt(attendenceDate);

    const payload = {
      attendenceDate: attendenceDate,
      checkOutTime: Math.floor(Date.now() / 1000),
      userId: user,
    };

    const url = `/attendence/checkOut`;
    this.dataService.post(url, payload).then(
      (resp: any) => {
        this.clearTimer();
        const payload = {
          attendenceDate: null,
          checkInTime: null,
        };
        this.dataService.updateSession(payload);
        this.getUserAttendence();
        if (this.isAnyActiveTask) {
          this.stopTask();
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  markCheckIn() {
    this.checkedIn = !this.checkedIn;
    if (this.checkedIn) this.checkIn();
    else this.checkOut();
  }

  startTimer(startTime: number) {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';

      // const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime * 1000;
        this.transform(this.counter / 1000);
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  transform(value: number): void {
    var sec_num = value;
    this.hours = Math.floor(sec_num / 3600);
    this.minutes = Math.floor((sec_num - this.hours * 3600) / 60);
    this.seconds = Math.floor(sec_num - this.hours * 3600 - this.minutes * 60);
  }

  getUserAttendence() {
    const url = `/attendence/getUserAttendence`;
    let user = this.dataService.userProfile['userId'];

    let payload = {
      id: user,
    };
    this.dataService.getById(url, payload).then(
      (resp: any) => {
        this.attendenceData = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  getActiveTask() {
    const url = `/tasks/userActiveTask/${this.dataService.userProfile['userId']}`;
    this.dataService.get(url).then(
      (resp: any) => {
        if (resp) {
          this.activeTask = resp;
          this.isAnyActiveTask = true;
          this.getAllSubTasks();
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  stopTask() {
    const url = `/tasks/stopTask`;
    const payload = {
      taskTrackId: this.activeTask['taskTrackId'],
    };

    this.dataService.post(url, payload).then(
      (resp: any) => {
        console.log(resp);
        this.isAnyActiveTask = false;
        this.activeTask = null;
        this.subTasks = [];
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  getAllSubTasks() {
    const url = `/subtasks/getAllSubTasks/${this.activeTask.taskId}`;
    this.dataService.get(url).then(
      (resp: any) => {
        if (resp.length > 0) {
          this.subTasks = resp;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  activateTask() {
    const config = {
      height: '35vh',
      width: '20%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      data: this.activeTask,
    };
    const dialogRef = this.dialog.open(TaskTrackFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.activeTask = result;
        this.isAnyActiveTask = true;
        this.getAllSubTasks();
      }
    });
  }
}
