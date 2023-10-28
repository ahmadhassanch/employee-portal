import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material_module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CCGeneralTableComponent } from 'src/app/shared/cc-general-table/cc-general-table.component';

const routes: Routes = [
  {
    path: '',
    component: CCGeneralTableComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class CCGeneralTableModule {}
