import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoleFormComponent } from './roles/role-form/role-form.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(public dialog: MatDialog) {}
}
