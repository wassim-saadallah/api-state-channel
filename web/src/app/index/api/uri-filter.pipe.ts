import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uriFilter'
})
export class UriFilterPipe implements PipeTransform {

  transform(uris: any[], type?: String): any {
    return uris.filter( value => value.type == type)
  }

}
