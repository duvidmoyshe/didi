import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class TempConverterPipe implements PipeTransform {

  transform(value: number, shwCelsius: boolean): any {
    if (shwCelsius) {
      return Math.floor((value - 32) * 5 / 9) + ' ' + 'C';
    } else {
      return value + ' ' + 'F';;
    }
  }
}
