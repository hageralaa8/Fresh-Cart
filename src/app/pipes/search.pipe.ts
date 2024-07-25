import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList:IProduct[], searchTerm:string): IProduct[] {
    //azay search fe array w arg3 haga mo3ina filter (Array Method) -> (hoc) higher order function bta5od mny call back function bt3mla call m3 kol 3onsr fe array w btrgly true ha5od el 3onsr or false msh ha5do
    //akrn toLocaleLowerCase - toLocaleLowerCase --> 3ashn aktb small capital ya5od true w yarg3ly
    return productList.filter((product)=>product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

}
