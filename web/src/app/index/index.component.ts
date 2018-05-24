import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { NotificationsService } from './notifications.service';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';



declare let $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class IndexComponent implements OnInit {

  constructor(public authService: AuthService, public nf: NotificationsService, private ref: ChangeDetectorRef, private snotifyService: SnotifyService) { }

  private notifications = [];

  ngOnInit() {
    this.nf.newestNotif.subscribe(res => {
      this.click();
      this.notifications.push(res)
      console.log(this.notifications);
      this.ref.detectChanges();
    });

  }

  click(){  
    let button : HTMLElement = document.getElementById('messages') as HTMLElement;
    button.click();
  }

  onclick(){
    this.snotifyService.success('you have just subscribed to a new API');
  }

  logout() {
    this.authService.doLogout()
  }

}
