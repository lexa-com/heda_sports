import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
authenticated: boolean = false;
tenOdds: boolean = false;
twentyOdds: boolean = false;
fiveOdds: boolean = false;
email: any;
vvipOdds: boolean = false;
liamOdds: boolean = false;
andrewOdds: boolean = false;
  constructor(private router:Router,
    private sharedService:SharedService
  ){

  }

  ngOnInit(): void {
   this.checkAuth()
  }

  checkSubscription(){
    this.sharedService.userArray.subscribe((res)=>{
      const subscrib = res[0].five.split('+')[0]
      const subscribten = res[0].ten.split('+')[0]
      const subscribtwenty = res[0].twenty.split('+')[0]
      const subscribvvip = res[0].vvip.split('+')[0]
      const subscribtip1 = res[0].tipster1.split('+')[0]
      const subscribtip2 = res[0].tipster2.split('+')[0]
      
      if (subscrib =='Yes'){
        this.fiveOdds = true
        console.log('sawa')
      }
      if (subscribten =='Yes'){
        this.tenOdds = true
      }
      if (subscribtwenty =='Yes'){
        this.twentyOdds = true
      }
      if (subscribvvip =='Yes'){
        this.vvipOdds = true
      }
      if (subscribtip1 =='Yes'){
        this.liamOdds = true
      }
      if (subscribtip2 =='Yes'){
        this.andrewOdds = true
      }
      this.email = res[0].email
    })
  }

  checkAuth(){
    this.sharedService.currentAuthStatus.subscribe((res)=>{
       if (res.length == 0){
            console.log('not authenticated')
       } else {
        this.authenticated = true
        this.checkSubscription()
       }
       if (res[0]=="null"){
        this.authenticated = false
       }
    })
  }

  navigate(link:string){
    console.log('clicked')
   this.router.navigate([`${link}`])

  }
}
