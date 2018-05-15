import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { MarketPlaceComponent } from '../market-place/market-place.component';
import { ApiComponent, ApiResolver } from '../api/api.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'market',
    component: MarketPlaceComponent
  },
  {
    path: 'api/:id',
    component: ApiComponent,
    resolve: {
      api: ApiResolver,
  }

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }