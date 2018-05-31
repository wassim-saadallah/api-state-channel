import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-my-apis',
  templateUrl: './my-apis.component.html',
  styleUrls: ['./my-apis.component.css']
})
export class MyApisComponent implements OnInit {


  private myapis = [];
  private account: string;
  private selected: any = {};
  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAccount().then(res => {
      this.account = res;
      console.log('account : ' + this.account);
      this.getUserApis();
    });



  }

  getUserApis() {
    const apikey = environment.firebase.apiKey;
    const token = JSON.parse(sessionStorage[`firebase:authUser:${apikey}:angular-auth-firebase`]);
    const apis: any[] = JSON.parse(sessionStorage[`apis`])
    const uid = token.uid;
    this.http.get('http://localhost:3000/users/' + uid).subscribe((res: any[]) => {
      console.log(res)
      for (let id of res['api_ids']) {
        if (id) {
          let item = apis.find(api => api._id == id);
          let match = /(http|ftp|https):\/\/.*/.test(item.URIs[0].uri)
          console.log(id, match)
          if (match) {
            let url;
            url = new URL(item.URIs[0].uri)
            console.log(url)
            this.http.get(url.origin + '/clients/' + this.account).subscribe(res => {
              console.log(res)
              let m = { name: item.name, balance: res['balance'], amount: res['amount'], id };
              console.log(m)
              this.myapis.push(m)
            });
          }
        }

      }
    })
  }

  async unsubscribe() {
    let args = await this.apiService.getSignature(this.selected.id, this.selected.balance)
    this.apiService.unsubscribe(args);
  }

}
