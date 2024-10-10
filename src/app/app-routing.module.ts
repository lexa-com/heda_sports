import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './main-components/landing-page/landing-page.component';
import { OverUnderComponent } from './main-components/over-under/over-under.component';
import { PremiumTenComponent } from './main-components/premium-ten/premium-ten.component';
import { PremiumTwentyComponent } from './main-components/premium-twenty/premium-twenty.component';
import { PremiumVvipComponent } from './main-components/premium-vvip/premium-vvip.component';
import { TipstersViewComponent } from './main-components/tipsters-view/tipsters-view.component';
import { MarketsComponent } from './main-components/markets/markets.component';
import { LogInComponent } from './main-components/log-in/log-in.component';
import { TipstersDetailsComponent } from './main-components/tipsters-details/tipsters-details.component';
import { PremiumHomeComponent } from './main-components/premium-home/premium-home.component';
import { PremiumFiveComponent } from './main-components/premium-five/premium-five.component';
import { SpecialTipsComponent } from './main-components/special-tips/special-tips.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: OverUnderComponent,
        pathMatch: 'full',
       
      },
      {
        path: 'over',
        component: OverUnderComponent,
        pathMatch: 'full',
       
      },
      {
        path: 'combo',
        component: SpecialTipsComponent,
        pathMatch: 'full',
       
      },
      {
        path: 'markets',
        component: MarketsComponent,
        pathMatch: 'full',
       
      },
      {
        path: 'auth',
        component: LogInComponent,
        pathMatch: 'full',
       
      },
      {
        path: 'tipsters',
        component: TipstersViewComponent,
        pathMatch: 'full',
       
      },
      {
        path: 'tipsters/details',
        component: TipstersDetailsComponent,
        pathMatch: 'full',
      },
      {
        path: 'premium/home',
        component: PremiumHomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'premium/five',
        component: PremiumFiveComponent,
        pathMatch: 'full',
      },
      {
        path: 'premium/ten',
        component: PremiumTenComponent,
        pathMatch: 'full',
      },
      {
        path: 'premium/twenty',
        component: PremiumTwentyComponent,
        pathMatch: 'full',
      },
      {
        path: 'premium/vvip',
        component: PremiumVvipComponent,
        pathMatch: 'full',
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
