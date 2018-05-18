import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { ApiComponent, ApiResolver } from './api/api.component';
import { UriFilterPipe } from './api/uri-filter.pipe';
import { ApiService } from './api/api.service';
import { FormsModule } from '@angular/forms';
import { IndexRoutingModule } from './index-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    MarketPlaceComponent,
    ApiComponent,
    UriFilterPipe,
    IndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule
  ],
  providers: [
    ApiResolver,
    ApiService
  ],
  bootstrap: []
})
export class IndexModule { }
