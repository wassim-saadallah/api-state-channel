import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-apis',
  templateUrl: './my-apis.component.html',
  styleUrls: ['./my-apis.component.css']
})
export class MyApisComponent implements OnInit {


  private myapis = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const apikey = environment.firebase.apiKey;
    const token = JSON.parse(sessionStorage[`firebase:authUser:${apikey}:angular-auth-firebase`]);
    const uid = token.uid;
    console.log(uid)
    this.http.get('http://localhost:3000/users/' + uid).subscribe(res =>{
      this.myapis = <any[]>res;
      console.log(res)
    })
  }

}
