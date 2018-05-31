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
      if (typeof res == 'string')
        this.notifications.push(res)
      else
        this.notifications.push(res.event + ' : ' + JSON.parse(sessionStorage.apis).find(api => api._id == res.api).name);
      this.ref.detectChanges();
      console.log(this.notifications);
      this.click();
    });

  }

  click() {
    let button: HTMLElement = document.getElementById('messages') as HTMLElement;
    button.click();
    console.log('clicked')
  }

  onclick(message) {
    this.snotifyService.success(this.notifications[this.notifications.length - 1]);
  }

  logout() {
    this.authService.doLogout()
  }

}
