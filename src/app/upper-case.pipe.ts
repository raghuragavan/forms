import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'upperCase'
})
export class UpperCasePipe implements PipeTransform {
constructor (private Sanitizier: DomSanitizer){}
  transform(value: string):string {
      return value.toUpperCase()
    }

  }

