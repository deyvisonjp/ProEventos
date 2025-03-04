import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from '../util/constants';

@Pipe({
  name: 'dateTimeFormatPipe',
  standalone: true,
})
export class DateTimeFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string | Date ): string {
    if (!value) return '-';
    return this.datePipe.transform(value, Constants.DATE_TIME_FORMAT, 'UTC') || '-';
  }
}
