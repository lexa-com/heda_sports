import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GamesService } from '../../Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TipsterPaywallComponent } from '../paywalls/tipster-paywall/tipster-paywall.component';
import { TestPaywallComponent } from '../paywalls/test-paywall/test-paywall.component';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-tipsters-view',
  templateUrl: './tipsters-view.component.html',
  styleUrl: './tipsters-view.component.css'
})
export class TipstersViewComponent implements OnInit {
  dialogConfig: MatDialogConfig<any> | undefined;
tipsterOne: boolean = false;
tipsterOneSub: boolean = true;
tipsterTwo: boolean = false;
  subscription: any;
  subscriptionOne: any;
  subscriptionTwo: any;
  matchDays: any[] = [];
  matchDays2: any[] = [];

  buttonColor:any = "black";
  buttonType:any = "buy";
  isCustomSize:any = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;
  duration: number = 15;
  userData: any;
 email:any;




  paymentRequest:any = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId"
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: "BCR2DN4T2OMJNFSG",
      merchantName: "Heda Sports"
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US"
    }
  };

  onLoadPaymentData(event:any,tipster:any) {
    console.log("load payment data", event.detail);
    this.updateUserData(tipster)
  }



  constructor(
    private gamesService: GamesService,
    private router: Router,
    private sharedService: SharedService,
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    ) { }
 
  
  ngOnInit(): void {
    this.dialogConfig = new MatDialogConfig();
    this.checkAuth()
  }

  checkAuth(){
    this.sharedService.currentAuthStatus.subscribe((res)=>{
       if (res.length == 0){
            console.log('not authenticated')
       } else {
        this.checkSubscription()
       }
    })
  }

  checkSubscription(){
    this.sharedService.userArray.subscribe((res)=>{
      this.email = res[0].email
      this.subscriptionOne = res[0].tipster1.split('+')[0]
      this.subscriptionTwo = res[0].tipster2.split('+')[0] || ''

      if (this.subscriptionOne == "Yes"){
           this.tipsterOne = true
           this.tipsterOneSub = false
           this.getTip1()
      }
      if (this.subscriptionTwo == "Yes"){
        this.tipsterTwo = true
        this.getTip2()
   }
    })

    console.log(this.email)
  }

  async updateUserData(tipster:any) {
    try {
      const userDocRef = this.firestore.collection('users').doc(this.email);
      const today = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + this.duration);
      const tipsterName = tipster
      const expiry = tipsterName + 'Date'
      const updatedData = {
        [tipsterName] : `Yes+${sevenDaysLater.toISOString()}`,
        paymentId:'paid google pay',  
          
      };
  
      await userDocRef.update(updatedData);  
      this.readUserData(this.email)
      
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  async readUserData(email: string) {
    try {
      const userDocRef = doc(this.firestore.firestore, 'users', email); // Reference to the user's document
      const userDocSnapshot = await getDoc(userDocRef); // Fetch the document
  
      if (userDocSnapshot.exists()) {
        this.userData = userDocSnapshot.data(); // Retrieve document data
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

  getTip2(){
    this.sharedService.tipster2Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchDays2 = matchDays
        .filter(day => day.date == formattedToday)
        .reverse(); 
    });

  }
  getTip1(){
  
    this.sharedService.tipster1Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchDays = matchDays
        .filter(day => day.date == formattedToday)
        .reverse();
    });

  }

  formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`; 
  }

  viewResults(tip:string){
    this.router.navigate(['tipsters/details'],{queryParams:{tipster:tip}})
  }
  
}
