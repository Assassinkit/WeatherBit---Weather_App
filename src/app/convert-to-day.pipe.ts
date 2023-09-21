import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'convertToDay'
})
export class ConvertToDayPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(datetime: string | null): string {
    if (!datetime) {
      // Return an empty string if there is no datetime
      return '';
    }

    const dateObj = new Date(datetime);
    return this.datePipe.transform(dateObj, 'EEE') || ''; // Use the safe navigation operator to handle potential null result
  }

}
