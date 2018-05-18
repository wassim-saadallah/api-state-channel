import { Component, OnInit, Injectable, trigger, transition, style, animate, state } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';


@Injectable()
export class ApiResolver implements Resolve<any[]> {

  private api = {};
  private amount = 50000;

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.http.get('http://localhost:3000/' + id);
  }
}


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  private api: any;

  private response = {};
  private account: string;
  private balance: string;
  private callCost = 0.0000001;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.data.subscribe(({ api }) => {
      this.api = api;
    })

    this.apiService.getAccount().then(acc => {
      this.account = acc;
      this.apiService.getBalance(acc).then(res => this.balance = res)
    })
  }
  

  callApi(uri: string, method: string) {
    let data: string;
    this.apiService.callApi('http://localhost:3001' + uri, 'get').subscribe(res => {
      console.log(JSON.stringify(res))
      this.response = {
        uri,
        method,
        data : res
      }
    })
  }

}
