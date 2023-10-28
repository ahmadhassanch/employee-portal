import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { menuListClass } from 'src/app/pages/side-bar';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  taskForm: FormGroup;
  taskId = null;
  scalesList: string[];
  isEdit = false;
  menu = new menuListClass();
  configurationList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskFormComponent>
  ) {
    this.taskForm = this.fb.group({
      title: [null, Validators['required']],
    });
    if (data) {
      this.taskForm.patchValue(data);
      this.taskId = data.taskId;
      this.isEdit = true;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  makePayload() {
    const { title } = this.taskForm.value;
    const payload = {
      title,
    };
    return payload;
  }

  onSave() {
    const payload = this.makePayload();
    const url = `/tasks/createTask`;

    this.dataService.post(url, payload).then(
      (resp: any) => {
        this.dialogRef.close();
        console.log(resp);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  onUpdate() {
    const payload = this.makePayload();
    const url = `/tasks/updateTask/${this.taskId}`;

    this.dataService.patch(url, payload).then(
      (resp: any) => {
        this.dialogRef.close();
        console.log(resp);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
