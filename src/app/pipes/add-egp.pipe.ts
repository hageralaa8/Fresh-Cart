import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addEGP'
})
export class AddEGPPipe implements PipeTransform {

  transform(price: any): string {
    //
     return `${price} EGP `;
  }

}
