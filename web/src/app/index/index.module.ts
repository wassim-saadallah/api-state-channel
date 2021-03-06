import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { IndexComponent } from './index.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { ApiComponent, ApiResolver } from './api/api.component';
import { UriFilterPipe } from './api/uri-filter.pipe';
import { ApiService } from './api/api.service';
import { FormsModule } from '@angular/forms';
import { IndexRoutingModule } from './index-routing.module';
import { NotificationsService } from './notifications.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MyApisComponent } from './my-apis/my-apis.component';



@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent,
    MarketPlaceComponent,
    ApiComponent,
    UriFilterPipe,
    MyApisComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule,
    SnotifyModule,
    LoadingBarRouterModule
  ],
  providers: [
    ApiResolver,
    NotificationsService,
    ApiService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: []
})
export class IndexModule { }
