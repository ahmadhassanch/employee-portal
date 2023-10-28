import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { SubTasks } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'sub-tasks-table',
  templateUrl: './sub-tasks-table.component.html',
  styleUrls: ['./sub-tasks-table.component.scss'],
})
export class SubTasksTableComponent {
  allTasks: SubTasks[] = [{ title: '' }];
  task = null;

  keyDown$: Observable<any> = fromEvent(document, 'keydown');
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SubTasksTableComponent>
  ) {
    if (data) {
      this.task = data;
    }
  }

  ngOnInit() {
    this.getAllSubTasks();
    this.subscribeKeyEvents();
  }

  subscribeKeyEvents() {
    this.subscription = this.keyDown$.subscribe((ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        this.onAddSubTasks();
      }
    });
  }

  onAddSubTasks() {
    this.allTasks.push({ title: '' });
  }

  getAllSubTasks() {
    const url = `/subtasks/getAllSubTasks/${this.task.taskId}`;

    this.dataService.get(url).then(
      (resp: any) => {
        if (resp.length > 0) {
          this.allTasks = resp;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  onCancel() {
    this.dialogRef.close();
  }

  onRemoveItem(subTask, index) {
    if (subTask['subTaskId']) {
      this.deleteSubtask(subTask['subTaskId'], index);
    } else {
      this.allTasks.splice(index, 1);
    }
  }

  deleteSubtask(subtaskId, index) {
    const url = `/subtasks/updateSubTask/${subtaskId}`;
    this.dataService.patch(url, { isDeleted: true }).then(
      (resp: any) => {
        this.allTasks.splice(index, 1);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  makePayLoad() {
    this.allTasks.forEach((subTasks) => {
      subTasks['taskId'] = this.task.taskId;
    });
  }

  onSave() {
    this.makePayLoad();
    const url = `/subtasks/createSubTasks`;

    this.dataService.post(url, this.allTasks).then(
      (resp: any) => {
        this.dialogRef.close();
        console.log(resp);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
