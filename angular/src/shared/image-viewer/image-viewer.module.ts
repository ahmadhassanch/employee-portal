import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ImageViewerComponent } from './image-viewer.component';



@NgModule({
  declarations: [
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PipeModule
  ],
  exports:[
    ImageViewerComponent
  ]
})
export class ImageViewerModule { }
