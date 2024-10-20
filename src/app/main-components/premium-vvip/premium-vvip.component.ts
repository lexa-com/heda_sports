import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../../Services/games.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../Services/shared.service';
import { PremiumPaywallComponent } from '../paywalls/premium-paywall/premium-paywall.component';

@Component({
  selector: 'app-premium-vvip',
  templateUrl: './premium-vvip.component.html',
  styleUrl: './premium-vvip.component.css'
})
export class PremiumVvipComponent implements OnInit {

  fixtures: any = [];
  pickedDate: any;
    overGames: any[] = [];
    data: any[]=[];
    authenticated:boolean = true
    subscribed:boolean = true
    subscription:boolean = true
    hideDate:boolean = true
    loggedIn:string = ''
    dialogConfig: MatDialogConfig<any> | undefined;
  
  constructor(
    private dataService: GamesService,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog,
    ) { }
  
  ngOnInit(): void {
    //this.checkSubscription()
    this.setTodayDate()
    this.dialogConfig = new MatDialogConfig();
    this.checkAuth()
  }

  getOlderGames(){
    
    this.sharedService.vipArray.subscribe((res)=>{
      this.data = res
    this.overGames = res.filter(item => item.category === "14" && item.date < this.pickedDate)
    this.fixtures = this.overGames.reverse()
    
    })
  }
  
  
  fetchGames(){
  this.sharedService.vipArray.subscribe((res)=>{
    this.data = res
  this.overGames = res.filter(item => item.category === "14" && item.date == this.pickedDate)
  this.fixtures = this.overGames
  
  })
  
  }
  
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(input.value);
    
    const formattedDate = this.formatDate(selectedDate);
    this.pickedDate = formattedDate
    this.fixtures = this.data.filter(item => item.date == formattedDate && item.category =="14")
    
  }
  
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  setTodayDate(): void {
    const today = new Date(); // Get today's date
    this.pickedDate = this.formatDate(today); // Format and set pickedDate
    
  }

  checkSubscription(){
    this.sharedService.userArray.subscribe((res)=>{
      const subscrib = res[0].vvip.split('+')[0]
      if (subscrib =='Yes' || res[0].admin=='Yes'){
        this.authenticated = true
        this.subscription = false
        this.fetchGames()
      }else{
        this.getOlderGames()
        this.authenticated = false
        this.hideDate = false
        //t
      }
    })
  }

  checkAuth(){
    this.sharedService.currentAuthStatus.subscribe((res)=>{
       if (res.length == 0){
        this.getOlderGames()
        this.hideDate = false

       } else {
        this.checkSubscription()
       }
    })
  }
  getPaymentRequest(name: string) {
    let totalPrice;
    switch (name) {
      case 'week':
        totalPrice = '15.00';
        break;
      case '2weeks':
        totalPrice = '28.00';
        break;
      case 'month':
        totalPrice = '52.00';
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

  openDialog(message: string) {
    const paymentRequest = this.getPaymentRequest(message);
    this.sharedService.currentAuthStatus.subscribe((res) => {
      if (res[0] === 'authenticated') {
        const dialogRef = this.dialog.open(PremiumPaywallComponent, {
          width: '440px',
          height:'1000px',
          data: {
            message: message, // category
            email: res[1],    // email
            category: 'vvip',
            req:paymentRequest
          }
        });
  
        // Handle dialog close and trigger actions
        dialogRef.afterClosed().subscribe((result) => {
          
          this.ngOnInit(); // Call the method after dialog close
        });
  
      } else {
        window.alert('Please Log in to continue');
      }
    });
  }
  
  
  }
  

