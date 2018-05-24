import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { NotificationsService } from './notifications.service';


declare let $:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class IndexComponent implements OnInit {

  constructor(public authService:AuthService, public nf: NotificationsService, private ref: ChangeDetectorRef) { }

  private notifications = [];

  ngOnInit() {
      this.nf.newestNotif.subscribe(res => {
        this.notifications.push(res)
        console.log(this.notifications)
        // this.ref.markForCheck();
        this.ref.detectChanges();
      });

  }

  logout(){
    this.authService.doLogout()
  }

}
