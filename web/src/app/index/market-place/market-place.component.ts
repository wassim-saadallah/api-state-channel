import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private apis = [];

  ngOnInit() {
    console.log('ng on init market place component')
    this.http.get('http://localhost:3000').subscribe(
      res =>{
        console.log(res)
        this.apis = <any[]>res;
      },
      err => console.log(err)
    )
  }
}
