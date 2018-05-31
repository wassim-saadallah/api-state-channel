import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class NotificationsService {


  public newestNotif: Subject<any> = new BehaviorSubject<any>("You have just logged in")

  constructor() { }


  update(notfication) {
    console.log('NOTIF')
    this.newestNotif.next(notfication)


  }

}
