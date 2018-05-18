import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../index/dashboard/dashboard.component'
import { MarketPlaceComponent } from '../index/market-place/market-place.component';
import { ApiComponent, ApiResolver } from '../index/api/api.component';
import { LoginComponent } from '../login/login.component';
import { IndexComponent } from './index.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'index',
        component: DashboardComponent,
      },
      {
        path: 'api/:id',
        component: ApiComponent,
        resolve: {
          api: ApiResolver,
        }
      },
      {
        path: 'market',
        component: MarketPlaceComponent
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class IndexRoutingModule { }