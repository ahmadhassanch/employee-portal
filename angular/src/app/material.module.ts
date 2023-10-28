import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class MaterialModule {}
