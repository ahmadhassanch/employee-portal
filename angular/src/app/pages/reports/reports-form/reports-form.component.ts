import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'reports-form',
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.scss'],
})
export class ReportFormComponent {
  reportForm: FormGroup;
  isEdit = false;
  reportId: string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReportFormComponent>
  ) {
    this.reportForm = this.fb.group({
      description: [null, Validators['required']],
      reportDate: [null, Validators['required']],
    });

    if (data) {
      this.reportForm.patchValue(data);
      this.reportId = data['reportId'];
      this.reportForm.controls['reportDate'].setValue(
        new Date(data.reportDate * 1000)
      );
      this.isEdit = true;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  makePayload() {
    let payload = this.reportForm.value;
    payload['reportDate'] = Math.floor(
      this.reportForm.controls['reportDate'].value.getTime() / 1000
    );

    return payload;
  }

  onSave() {
    let payload = this.makePayload();
    payload['userId'] = this.dataService.userProfile.userId;
    const url = `/reports/createUserReport`;
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

  onEdit() {
    const payload = this.makePayload();
    const url = `/reports/updateReport/${this.reportId}`;
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
