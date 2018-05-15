import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ApiComponent, ApiResolver } from './api/api.component';
import { UriFilterPipe } from './api/uri-filter.pipe';
import { ApiService } from './api/api.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MarketPlaceComponent,
    ApiComponent,
    UriFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    ApiResolver,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
