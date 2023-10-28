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
  selector: 'role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent {
  roleForm: FormGroup;
  roleId: string = null;
  scalesList: string[];
  isEdit = false;
  menu = new menuListClass();
  configurationList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RoleFormComponent>
  ) {
    this.roleForm = this.fb.group({
      title: [null, Validators['required']],
      scale: [null, Validators['required']],
      permissions: [null, Validators['required']],
    });
    if (data) {
      this.roleForm.patchValue(data);
      let scale = this.roleForm.controls['scale'].value.toString();
      this.roleForm.controls['scale'].setValue(scale);
      this.roleId = data['roleId'];
      this.isEdit = true;
    }

    this.getScales();
    this.makeConfiguration();
  }

  makeConfiguration() {
    this.menu.menuList.forEach((element) => {
      this.configurationList.push(element.rout);
    });
  }

  getScales() {
    const url = `/settings/getScales`;

    this.dataService.get(url).then(
      (resp: any) => {
        this.scalesList = resp.scales;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

  makePermissions(permissions, permissionsList) {
    permissionsList.forEach((permission, index) => {
      permissions +=
        index == permissionsList.length - 1 ? permission : permission + ',';
    });
    return permissions;
  }

  makePayload() {
    const { title, scale, permissions } = this.roleForm.value;
    let permissionString = '';
    permissionString = this.makePermissions(permissionString, permissions);
    const payload = {
      title,
      scale: parseInt(scale),
      permissions: permissionString,
    };

    return payload;
  }

  onSave() {
    const payload = this.makePayload();
    const url = `/settings/createRole`;

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
    const url = `/settings/updateRole/${this.roleId}`;

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
