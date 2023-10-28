import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDifference',
})
export class DateDifferencePipe implements PipeTransform {
  transform(value: number) {
    const hour = Math.floor(value / 3600);
    const minutes = Math.floor((value - hour * 3600) / 60);
    const seconds = Math.floor(value - (hour * 3600 + minutes * 60));

    let formattedTime = '';

    if (hour > 0) {
      formattedTime = `${hour < 10 ? '0' + hour : hour}h :${
        minutes < 10 ? '0' + minutes : minutes
      }m`;
    } else {
      formattedTime = `${minutes < 10 ? '0' + minutes : minutes}m :${
        seconds < 10 ? '0' + seconds : seconds
      }s`;
    }

    return formattedTime;
  }
}
