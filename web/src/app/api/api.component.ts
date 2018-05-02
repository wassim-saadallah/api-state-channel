import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  private id: number;
  private api = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>  {

      this.id = +params.id;

      this.http.get('http://localhost:3000/' + this.id).subscribe(res =>{
        this.api = res;
      })
    })
  }

}
