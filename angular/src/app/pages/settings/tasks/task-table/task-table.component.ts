import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/service/data-service.service';
import { SubTasksTableComponent } from '../../sub-tasks/sub-tasks-table.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Tasks } from 'src/app/models/model';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent {
  allTasks: Tasks[] = [];
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  onEdit(data) {
    const config = {
      height: '40vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      data: data,
    };
    const dialogRef = this.dialog.open(TaskFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTasks();
    });
  }

  onAddSubTasks(data) {
    const config = {
      height: '60vh',
      width: '36%',
      panelClass: 'custom-modalbox',
      disableClose: false,
      data: data,
    };
    const dialogRef = this.dialog.open(SubTasksTableComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTasks();
    });
  }

  getAllTasks() {
    const url = `/tasks/getAllTasks`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.allTasks = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  onAddTasks() {
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
    const dialogRef = this.dialog.open(TaskFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTasks();
    });
  }
}
