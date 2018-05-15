import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  callApi(url: string, method: string, data?: any): Observable<any> {

    let methodName = method.toLowerCase();
    console.log(url, methodName)

    if(data)
      return this.http[methodName](url, data)
    else
      return this.http[methodName](url)
  }

}
