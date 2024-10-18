import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

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
  showCard:boolean = true

constructor(private shared: SharedService){

}

ngOnInit(): void {
  this.checkAuth()

}

checkAuth(){

  this.shared.currentAuthStatus.subscribe((res)=>{
  if (res[0]=='authenticated'){
    this.getSupscriptions()

    }
    if (res[0]=='null' || res[0]==''){
      this.showCard = false
  
      }

  })
}

  getSupscriptions() {
    this.shared.userArray.subscribe((res)=>{
      this.user = res[0]
      this.email = this.user.email
      this.fivestatus = this.user.five.split('+')[0]
       this.fiveDays = this.calculateDaysRemaining(this.user.five.split('+')[1].split('+')[0])
      this.tenStatus = this.user.ten.split('+')[0]
      this.tenDays = this.calculateDaysRemaining(this.user.ten.split('+')[1].split('+')[0])
      this.twentyStatus = this.user.twenty.split('+')[0]
      this.twentyDays = this.calculateDaysRemaining(this.user.twenty.split('+')[1].split('+')[0])
      this.vvipStatus = this.user.vvip.split('+')[0]
      this.vvipDays = this.calculateDaysRemaining(this.user.vvip.split('+')[1].split('+')[0])
      this.tip1Status = this.user.tipster1.split('+')[0]
      this.tip1Days = this.calculateDaysRemaining(this.user.tipster1.split('+')[1].split('+')[0])
      this.tip2Status = this.user.tipster2.split('+')[0]
      this.tip2Days = this.calculateDaysRemaining(this.user.tipster2.split('+')[1].split('+')[0])

      this.removeSubscription()
      
    })
  }

  calculateDaysRemaining(subscriptionEndDate:any): number {
    const currentDate = new Date();
    const daysRemaining = differenceInDays(subscriptionEndDate, currentDate);
    return daysRemaining > 0 ? daysRemaining : 0;
  }

  
  removeSubscription(){


  }

}
