import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GamesService } from '../../Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TipsterPaywallComponent } from '../paywalls/tipster-paywall/tipster-paywall.component';
import { TestPaywallComponent } from '../paywalls/test-paywall/test-paywall.component';
import { TipsterGameUpdateComponent } from '../../admin/tipster-games/tipster-game-update/tipster-game-update.component';

@Component({
  selector: 'app-tipsters-view',
  templateUrl: './tipsters-view.component.html',
  styleUrl: './tipsters-view.component.css'
})
export class TipstersViewComponent implements OnInit {
  dialogConfig: MatDialogConfig<any> | undefined;
tipsterOne: boolean = false;
tipsterTwo: boolean = false;
hideSub1:boolean = true
hideSub2:boolean = true
  subscription: any;
  subscriptionOne: any;
  subscriptionTwo: any;
  matchDays: any[] = [];
  matchDays2: any[] = [];
  matchOdds: any[] = [];
  matchOdds2: any[] = [];
  paymentRequest: any;
  admin: any;
  isAdmin:boolean = false
  dateTitle:any
  totalOdds: any;
  totalOdds1: any;

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
    const date = new Date();
    this.dateTitle = this.formatDateToDDMMYYYY(date);
    this.getOdds()
  }

  openDialog(name: string, price: string, id: string) {
    const paymentRequest = this.getPaymentRequest(id);
  
    this.sharedService.currentAuthStatus.subscribe((res) => {
      if (res[0] === 'authenticated') {
        const dialogRef = this.dialog.open(TipsterPaywallComponent, {
          width: '400px',
          data: {
            message: name,        // category
            email: res[1],        // email
            category: price,      // rate card
            id: id,
            req: paymentRequest   // Use dynamic paymentRequest
          }
        });
      } else {
        window.alert('Please Log in to continue');
      }
    });
  }

  getPaymentRequest(name: string) {
    let totalPrice;
    switch (name) {
      case 'tipster1':
        totalPrice = '50.00';
        break;
      case 'tipster2':
        totalPrice = '65.00';
        break;
      default:
        totalPrice = '0.00'; // Default or fallback price
    }
  
    return {
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
        totalPrice: totalPrice, // Dynamic price based on switch statement
        currencyCode: "USD",
        countryCode: "US"
      }
    };
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
      if (res.length === 0){
        return
      }
      
      this.admin = res[0].admin
      this.subscriptionOne = res[0].tipster1.split('+')[0]
      this.subscriptionTwo = res[0].tipster2.split('+')[0]

      if(this.admin =='Yes'){
        this.isAdmin = true
      }

      if (this.subscriptionOne == "Yes"|| this.admin =='Yes'){
           this.tipsterOne = true
           this.getTip1()
           this.hideSub1 = false
      }
      if (this.subscriptionTwo == "Yes" || this.admin =='Yes'){
        this.tipsterTwo = true
        this.getTip2()
        this.hideSub2 = false
   }
    })
  }
  getOdds(){
    this.sharedService.tipster2Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchOdds2 = matchDays
        .filter(day => day.date == formattedToday && day.category =="tipster2") 

        this.totalOdds = this.matchOdds2.reduce((sum, day) => {
          const odds = parseFloat(day.odds) || 0; // Convert to float, default to 0 if invalid
          return sum + odds;
        }, 0);
    });

    this.sharedService.tipster2Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchOdds = matchDays
        .filter(day => day.date == formattedToday && day.category =="tipster1")
        this.totalOdds1 = this.matchOdds.reduce((sum, day) => {
          const odds = parseFloat(day.odds) || 0; 
          return sum + odds;
        }, 0);
    });
  }

  getTip2(){
    this.sharedService.tipster2Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchDays2 = matchDays
        .filter(day => day.date == formattedToday && day.category =="tipster2") 

        this.totalOdds = this.matchDays2.reduce((sum, day) => {
          const odds = parseFloat(day.odds) || 0; // Convert to float, default to 0 if invalid
          return sum + odds;
        }, 0);
    });
    
  }
  getTip1(){
  
    this.sharedService.tipster2Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchDays = matchDays
        .filter(day => day.date == formattedToday && day.category =="tipster1")
        this.totalOdds1 = this.matchDays.reduce((sum, day) => {
          const odds = parseFloat(day.odds) || 0; 
          return sum + odds;
        }, 0);
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
  modifyGame(game:any){
    const dialogRef = this.dialog.open(TipsterGameUpdateComponent, {
      width: '520px',
      height:'450px',
      data:{
        match:game,
        category:"update",
        }
    });
    dialogRef.afterClosed().subscribe((result) => {
    if (result.data == "modify"){
      this.checkAuth()

    }else if (result.data == "delete"){
      this.checkAuth()
      
    }
      
    });


  }
  
}
