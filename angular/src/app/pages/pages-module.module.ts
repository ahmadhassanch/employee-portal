import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { GeneralPageComponent } from './general-page/general-page.component';
import { TableComponent } from './general-table/general-table.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageRoutingModule } from './page-routing.module';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipeModule } from '../pipes/pipe.module';
import { RoleFormComponent } from './settings/roles/role-form/role-form.component';
import { EmployeeFormComponent } from './employees/employees-form/employees-form.component';
import { EmployeeComponent } from './employees/employees-table/employee-table.component';
import { ReportComponent } from './reports/reports.component';
import { ReportFormComponent } from './reports/reports-form/reports-form.component';
import { ImageViewerModule } from 'src/shared/image-viewer/image-viewer.module';
import { RoleTableComponent } from './settings/roles/role-table/role-table.component';
import { MyteamComponent } from './my-team/my-team.component';
import { ReportTableComponent } from './my-team/team-reports/report-table.component';
import { FormsModule } from '@angular/forms';
import { TeamAttendenceComponent } from './my-team/team-attendence/team-attendence.component';
import { TaskFormComponent } from './settings/tasks/task-form/task-form.component';
import { TaskTableComponent } from './settings/tasks/task-table/task-table.component';
import { TaskTrackFormComponent } from './dashboard/task-track/task-track-form.component';
import { ProgressTableComponent } from './my-team/team-progress/progress-table.component';
import { SubTasksTableComponent } from './settings/sub-tasks/sub-tasks-table.component';

@NgModule({
  declarations: [
    MainComponent,
    SideBarComponent,
    GeneralPageComponent,
    TableComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    SettingsComponent,
    DashboardComponent,
    RoleFormComponent,
    ReportComponent,
    ReportFormComponent,
    RoleTableComponent,
    MyteamComponent,
    ReportTableComponent,
    TeamAttendenceComponent,
    TaskTableComponent,
    TaskFormComponent,
    TaskTrackFormComponent,
    ProgressTableComponent,
    SubTasksTableComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    PipeModule,
    FormsModule,
    ImageViewerModule,
  ],
})
export class PagesModuleModule {}
