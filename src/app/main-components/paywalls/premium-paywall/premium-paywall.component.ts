import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-premium-paywall',
  templateUrl: './premium-paywall.component.html',
  styleUrl: './premium-paywall.component.css'
})
export class PremiumPaywallComponent implements OnInit {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  email:any = '';
product: any;
amount: any;
description: any;
duration: number = 0;
userData: any;

  constructor(
    public dialogRef: MatDialogRef<PremiumPaywallComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private router: Router,
    private sharedService: SharedService,
  private firestore: AngularFirestore,
  
  ) {}

ngOnInit(): void {
  this.prepareReceipt()
      
  }

  cancelTransaction() {
    this.dialogRef.close();
  }

  

  prepareReceipt(){
    const five = '5+ ODDS TIPS DAILY'
    const ten = '10+ ODDS TIPS DAILY'
    const twenty = '20+ ODDS TIPS DAILY'
    const vvip = 'DAILY VVIP TIPS'
    if (this.Data.message == 'week' && this.Data.category == 'five'){
      this.amount = '7'
      this.duration = 7
      this.product = five
      this.description = 'One week subscription'
      this.processPayments('P-74174117DW546953KM4HFWQQ','blue')
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'five'){
       this.amount = '13'
       this.product = five
       this.duration = 14
       this.description = 'Two week subscription'
       this.processPayments('P-3CP48134RH121484CM4HC4WA','white')
    }
    if (this.Data.message == 'month'&& this.Data.category == 'five'){
      this.amount = '25'
      this.product = five
      this.duration = 31
      this.description = 'One month subscription'
      this.processPayments('P-2AS11892JV8103921M4HC5CY','gold')
    }
    if (this.Data.message == 'week' && this.Data.category == 'ten'){
      this.amount = '12'
      this.duration = 7
      this.product = ten
      this.description = 'One week subscription'
      this.processPayments('P-5SP53530MU705144HM4HCXGA','silver')
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'ten'){
      this.amount = '22'
      this.product = ten
      this.duration = 14
      this.description = 'Two week subscription'
      this.processPayments('P-9AU84005W69947407M4HCX3Y','white')
   }
   if (this.Data.message == 'month'&& this.Data.category == 'ten'){
     this.amount = '42'
     this.product = ten
     this.duration = 31
     this.description = 'One month subscription'
     this.processPayments('P-7VS30679FK185750KM4HCYRI','gold')
   }
   if (this.Data.message == 'week' && this.Data.category == 'twenty'){
    this.amount = '20'
    this.duration = 7
    this.product = twenty
    this.description = 'One week subscription'
    this.processPayments('P-6TT21929LB203732WM4HCKOA','silver')
  }
  if (this.Data.message == '2weeks'&& this.Data.category == 'twenty'){
    this.amount = '36'
    this.product = twenty
    this.duration = 14
    this.description = 'Two week subscription'
    this.processPayments('P-60N92440BG375173VM4HCNII','white')
 }
 if (this.Data.message == 'month'&& this.Data.category == 'twenty'){
   this.amount = '70'
   this.product = twenty
   this.duration = 31
   this.description = 'One month subscription'
   this.processPayments('P-65N43845G1175240PM4HCOJA','gold')
 }
 if (this.Data.message == 'week' && this.Data.category == 'vvip'){
  this.amount = '15'
  this.duration = 7
  this.product = vvip
  this.description = 'One week subscription'
  this.processPayments('P-3JD825585L955904AM4HC6JA','silver')
}
if (this.Data.message == '2weeks'&& this.Data.category == 'vvip'){
  this.amount = '28'
  this.product = vvip
  this.duration = 14
  this.description = 'Two week subscription'
  this.processPayments('P-2NC20020FR899132SM4HC62A','white')
}
if (this.Data.message == 'month'&& this.Data.category == 'vvip'){
 this.amount = '52'
 this.product = vvip
 this.duration = 31
 this.description = 'One month subscription'
 this.processPayments('P-0VS571048H8536746M4HC7IY','gold')
}
  }
  async updateUserData(email: string, newData: any) {
    try {
      const userDocRef = this.firestore.collection('users').doc(email);
  
      // Get current date and time
      const today = new Date();
      
      // Get the date seven days in the future
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + this.duration);

      const category = this.Data.category
      const status = `Yes+${sevenDaysLater.toISOString()}+${this.duration}`
  
      // Add the dates to your new data object
      const updatedData = {
        [category]: status,
        paymentId:newData.paymentID,  // Spread the existing data you want to update
      };
  
      // Update the document with the updated data
      await userDocRef.update(updatedData);  
      this.readUserData(email)
      
    } catch (error) {
      
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
    this.dialogRef.close()
  }

  processPayments(planId:any,color:any){
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AYLpTYnE2OxbtxgX28xMaOjXdK6ngvOm8WcjqP9d7X7FDswJUuY4rCUENu0pDqA93S6tLu9xW7fOChTW&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    document.body.appendChild(script);

    script.onload = () => {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: color,
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data: any, actions: { subscription: { create: (arg0: { plan_id: string; }) => any; }; }) {
          return actions.subscription.create({
            plan_id: planId
          });
        },
        onApprove: (data: { subscriptionID: any; }, actions: any) => {
          this.updateUserData(this.Data.email, data.subscriptionID);
          this.dialogRef.close()
          alert(data.subscriptionID);
        }
        
      }).render(`#paypal-button-container-${planId}`);
    };

  }



}


