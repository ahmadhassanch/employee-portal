import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tasks } from 'src/app/models/model';
import { menuListClass } from 'src/app/pages/side-bar';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'task-track-form',
  templateUrl: './task-track-form.component.html',
  styleUrls: ['./task-track-form.component.scss'],
})
export class TaskTrackFormComponent {
  @Input() idToDeactivate: string = null;

  taskForm: FormGroup;
  tasks: Tasks[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dialogRef: MatDialogRef<TaskTrackFormComponent>
  ) {
    this.taskForm = this.fb.group({
      taskId: [null, Validators['required']],
    });

    this.getTasks();
  }

  getTasks() {
    const url = `/tasks/getAllTasks`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.tasks = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

  makePayload() {
    const { taskId } = this.taskForm.value;
    const payload = {
      taskId,
      userId: this.dataService.userProfile.userId,
    };

    return payload;
  }

  onSave() {
    const payload = this.makePayload();

    const url = `/tasks/createTaskTrack`;

    this.dataService.post(url, payload).then(
      (resp: any) => {
        this.dialogRef.close(resp);
        console.log(resp);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
