import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert number of seconds to hours, minutes and seconds ('1:59:59') etc
 */
@Pipe({
  name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {

  transform(timeInSeconds: number, args?: any): string {
    const hours = Math.floor(timeInSeconds / 3600);
    timeInSeconds %= 3600;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(val: number): string {
    if (val < 10) {
      return '0' + val;
    }
    return val.toString();
  }
}
