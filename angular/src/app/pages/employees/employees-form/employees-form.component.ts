import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Roles, TeamLeads } from 'src/app/models/model';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss'],
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  rloes: Roles[] = [];
  teamLeads: TeamLeads[] = [];
  isEdit = false;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeFormComponent>
  ) {
    this.employeeForm = this.fb.group({
      fName: [null],
      lName: [null],
      fatherName: [null],
      userName: [null],
      password: [null],
      nic: [null],
      emailOffice: [null],
      phone: [null],
      address: [null],
      teamLeadId: [null],
      roleId: [null],
      joiningDate: [null],
      profileImage: [null],
      designation: [null],
    });

    if (data) {
      this.employeeForm.patchValue(data);
      this.employeeForm.controls['joiningDate'].setValue(
        new Date(data.joiningDate * 1000)
      );
      this.userId = data.userId;
      this.isEdit = true;
      this.getTeamLeads(data['roleId']);
    }
  }

  ngOnInit() {
    this.getRoles();

    this.employeeForm.controls['roleId'].valueChanges.subscribe((roleId) => {
      this.getTeamLeads(roleId);
    });
  }

  getRoles() {
    const url = `/settings/getRoles`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.rloes = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  getTeamLeads(roleId) {
    const url = `/user/getTeamLeads/${roleId}`;
    this.dataService.get(url).then(
      (resp: any) => {
        this.teamLeads = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  onImageReceived(image) {
    this.employeeForm.controls['profileImage'].setValue(image.imgUrl);
  }

  onCancl() {
    this.dialogRef.close();
  }

  makePayload() {
    let payload = this.employeeForm.value;
    payload.joiningDate =
      this.employeeForm.controls['joiningDate'].value.getTime() / 1000;
    return payload;
  }

  onSave() {
    const payload = this.makePayload();
    const url = `/user/createEmployee`;
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
    const url = `/user/updateEmployee/${this.userId}`;
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
