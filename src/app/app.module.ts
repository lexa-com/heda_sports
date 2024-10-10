import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarComponent } from './main-components/app-bar/app-bar.component';
import { SideBarComponent } from './main-components/side-bar/side-bar.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { HomeWinsComponent } from './main-components/home-wins/home-wins.component';
import { AwayWinsComponent } from './main-components/away-wins/away-wins.component';
import { OverUnderComponent } from './main-components/over-under/over-under.component';
import { SpecialTipsComponent } from './main-components/special-tips/special-tips.component';
import { PremiumFiveComponent } from './main-components/premium-five/premium-five.component';
import { PremiumTenComponent } from './main-components/premium-ten/premium-ten.component';
import { PremiumTwentyComponent } from './main-components/premium-twenty/premium-twenty.component';
import { PremiumVvipComponent } from './main-components/premium-vvip/premium-vvip.component';
import { LogInComponent } from './main-components/log-in/log-in.component';
import { MarketsComponent } from './main-components/markets/markets.component';
import { ServicesOfferedComponent } from './main-components/services-offered/services-offered.component';
import { NotificationComponent } from './main-components/notification/notification.component';
import { TipstersViewComponent } from './main-components/tipsters-view/tipsters-view.component';
import { TipstersDetailsComponent } from './main-components/tipsters-details/tipsters-details.component';
import { LandingPageComponent } from './main-components/landing-page/landing-page.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar'; 

import{AngularFireModule} from '@angular/fire/compat'
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    SideBarComponent,
    FooterComponent,
    HomeWinsComponent,
    AwayWinsComponent,
    OverUnderComponent,
    SpecialTipsComponent,
    PremiumFiveComponent,
    PremiumTenComponent,
    PremiumTwentyComponent,
    PremiumVvipComponent,
    LogInComponent,
    MarketsComponent,
    ServicesOfferedComponent,
    NotificationComponent,
    TipstersViewComponent,
    TipstersDetailsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    AngularFireModule,
    FirestoreModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    

    
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
