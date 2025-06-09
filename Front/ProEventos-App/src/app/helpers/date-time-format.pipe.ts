import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../util/constants';

@Pipe({
  name: 'dateTimeFormatPipe',
  standalone: true,
})
export class DateTimeFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string | Date): string {
    if (!value) return '-';

    let dateValue: Date;

    if (typeof value === 'string') {
      // Converte manualmente de "dd/MM/yyyy HH:mm:ss" para um objeto Date
      const parts = value.split(/[\s/:]/); // ["24", "02", "2025", "11", "38", "20"]
      if (parts.length < 6) return '-';

      const [day, month, year, hour, minute, second] = parts.map(Number);

      dateValue = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    } else {
      dateValue = value;
    }

    return this.datePipe.transform(dateValue, Constants.DATE_TIME_FORMAT, 'UTC') || '-';
  }
}
