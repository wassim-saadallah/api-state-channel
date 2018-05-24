import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationsService {


  public newestNotif : Subject<any> = new BehaviorSubject<any>({});

  constructor() { }


  update(notfication){
    this.newestNotif.next(notfication);
  }

}
