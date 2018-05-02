import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ApiComponent } from './api/api.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MarketPlaceComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
