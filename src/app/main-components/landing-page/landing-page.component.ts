import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { VvipService } from '../../Services/vip.service/vvip.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { isPlatformBrowser } from '@angular/common';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {



  sideBarOpen = true;
  userData: any;
  email: any;
status: any;
  user: any;
fivestatus: any;
fiveDays: any;
  tenStatus: any;
  twentyStatus: any;
  vvipStatus: any;
  tip1Status: any;
  tip2Status: any;
  tenDays: any;
  twentyDays: any;
  vvipDays: any;
  tip1Days: any;
  tip2Days: any;
  
  constructor(
    private dataService: GamesService,
    private vipService:VvipService,
    private router: Router,
    private sharedService: SharedService,
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.fetchGames(); // Only call fetchGames in the browser
        this.getSupscriptions()
      }
      
    }

  async fetchGames() {
    try {
      const userDocRef = doc(this.firestore.firestore, 'games', 'matches');
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        this.userData = userDocSnapshot.data();
        
        this.sendArray(this.userData.games);
        this.sendVipArray(this.userData.games);
      } else {
        console.log('No user found with this email.');
      }
    } catch (error) {
      console.error('Error fetching games:', error); // Log the error for debugging
    }
  }
    sendArray(gamesArray:any) {
      this.sharedService.changeArray(gamesArray);
    }
    sendVipArray(gamesArray:any) {
      this.sharedService.changeVipArray(gamesArray);
    }

   getSupscriptions() {
   
      this.sharedService.userArray.subscribe((res)=>{

        if (res.length ==0){
          console.log("not autheeed")
          
        }

        this.user = res[0]
        this.email = this.user.email
        this.fivestatus = this.user.five.split('+')[0]
         this.fiveDays = this.calculateDaysRemaining(this.user.five.split('+')[1].split('+')[0])
         this.checkDates(this.fiveDays,this.fivestatus,"five")
        this.tenStatus = this.user.ten.split('+')[0]
        this.tenDays = this.calculateDaysRemaining(this.user.ten.split('+')[1].split('+')[0])
        this.checkDates(this.tenDays,this.tenStatus,"ten")
        this.twentyStatus = this.user.twenty.split('+')[0]
        this.twentyDays = this.calculateDaysRemaining(this.user.twenty.split('+')[1].split('+')[0])
        this.checkDates(this.twentyDays,this.twentyStatus,"twenty")
        this.vvipStatus = this.user.vvip.split('+')[0]
        this.vvipDays = this.calculateDaysRemaining(this.user.vvip.split('+')[1].split('+')[0])
        this.checkDates(this.vvipDays,this.vvipStatus,"vvip")
        this.tip1Status = this.user.tipster1.split('+')[0]
        this.tip1Days = this.calculateDaysRemaining(this.user.tipster1.split('+')[1].split('+')[0])
        this.checkDates(this.tip1Days,this.tip1Status,"tipster1")
        this.tip2Status = this.user.tipster2.split('+')[0]
        this.tip2Days = this.calculateDaysRemaining(this.user.tipster2.split('+')[1].split('+')[0])  
        this.checkDates(this.tip2Days,this.tip2Status,"tipster2")    
      })
            
    }

    calculateDaysRemaining(subscriptionEndDate:any): number {
      const currentDate = new Date();
      const daysRemaining = differenceInDays(subscriptionEndDate, currentDate);
      return daysRemaining
    }
  
checkDates(days:any,status:any,category:any){
      if (days < 0 && status =="Yes"){ 
        this.removeSubscription(this.email,category)
      }
    }
  
async removeSubscription(email: string,category:any) {
  
      const today = new Date();
      try {
        const userDocRef = this.firestore.collection('users').doc(email);
        const status = `No+${today.toISOString()}+4`
        const updatedData = {
          [category]: status
        };
        await userDocRef.update(updatedData);  
        this.readUserData(this.email)
      } catch (error) {
        
      }
    }
 async readUserData(email: string) {
      try {
        const userDocRef = doc(this.firestore.firestore, 'users', email);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
          this.userData = userDocSnapshot.data(); 
          this.sendUserArray([this.userData])
                    
        } else {
          console.log('No user found with this email.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    sendUserArray(userArray:any) {
      this.sharedService.changeUserArray(userArray);
    }
}
