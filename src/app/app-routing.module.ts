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
import { HomeWinsComponent } from './main-components/home-wins/home-wins.component';
import { AwayWinsComponent } from './main-components/away-wins/away-wins.component';
import { UserProfileComponent } from './main-components/user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'over', // Redirect to 'over' if the path is empty
        pathMatch: 'full',
      },
      {
        path: 'over',
        component: OverUnderComponent,
      },
      {
        path: 'special',
        component: SpecialTipsComponent,
      },
      {
        path: 'home',
        component: HomeWinsComponent,
      },
      {
        path: 'high',
        component: AwayWinsComponent,
      },
      {
        path: 'markets',
        component: MarketsComponent,
      },
      {
        path: 'auth',
        component: LogInComponent,
      },
      {
        path: 'tipsters',
        component: TipstersViewComponent,
      },
      {
        path: 'tipsters/details',
        component: TipstersDetailsComponent,
      },
      {
        path: 'premium/home',
        component: PremiumHomeComponent,
      },
      {
        path: 'premium/five',
        component: PremiumFiveComponent,
      },
      {
        path: 'premium/ten',
        component: PremiumTenComponent,
      },
      {
        path: 'premium/twenty',
        component: PremiumTwentyComponent,
      },
      {
        path: 'premium/vvip',
        component: PremiumVvipComponent,
      },
      {
        path: 'user/profile',
        component: UserProfileComponent,
      },
      {
        path: 'malenge',
        component: AdminDashboardComponent,
      },
      {
        path: 'user/details',
        component: AdminUsersComponent,
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
