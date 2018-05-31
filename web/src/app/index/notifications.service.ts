import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Notification } from 'rxjs';

@Injectable()
export class NotificationsService {


  public newestNotif : Subject<any> = new ReplaySubject<any>(1)

  constructor() { }


  update(notfication){
    switch(notfication.event){
      case "subscription" : () =>{
        let name = JSON.parse(sessionStorage['apis'].find(api => notfication.api == api._id).name)
        let message = 'You have just subscribed to' + name
        this.newestNotif.next(message);
      }
      case "unsubscription" : () =>{
        let name = JSON.parse(sessionStorage['apis'].find(api => notfication.api == api._id).name)
        let message = 'You have just unsubscribed from' + name
        this.newestNotif.next(notfication);
      }
    }
    
  }

}
