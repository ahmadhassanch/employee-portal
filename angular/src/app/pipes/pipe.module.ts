import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDifferencePipe } from './dateDifference';

@NgModule({
  declarations: [
    DateDifferencePipe,
  ],
  exports: [
    DateDifferencePipe,
  ],
  imports: [CommonModule],
  providers: [],
})
export class PipeModule {}
