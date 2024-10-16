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
buttonColor:any = "black";
  buttonType:any = "buy";
  isCustomSize:any = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;

  paymentRequest:any = this.Data.req

  constructor(
    public dialogRef: MatDialogRef<PremiumPaywallComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private router: Router,
    private sharedService: SharedService,
  private firestore: AngularFirestore,
  
  ) {}

onLoadPaymentData(event:any,tipster:any) {
    console.log("load payment data", event.detail);
    this.updateUserData(this.Data.email)
  }

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
      
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'five'){
       this.amount = '13'
       this.product = five
       this.duration = 14
       this.description = 'Two week subscription'
       
    }
    if (this.Data.message == 'month'&& this.Data.category == 'five'){
      this.amount = '25'
      this.product = five
      this.duration = 31
      this.description = 'One month subscription'
      
    }
    if (this.Data.message == 'week' && this.Data.category == 'ten'){
      this.amount = '12'
      this.duration = 7
      this.product = ten
      this.description = 'One week subscription'
     
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'ten'){
      this.amount = '22'
      this.product = ten
      this.duration = 14
      this.description = 'Two week subscription'
      
   }
   if (this.Data.message == 'month'&& this.Data.category == 'ten'){
     this.amount = '42'
     this.product = ten
     this.duration = 31
     this.description = 'One month subscription'
     
   }
   if (this.Data.message == 'week' && this.Data.category == 'twenty'){
    this.amount = '20'
    this.duration = 7
    this.product = twenty
    this.description = 'One week subscription'
    
  }
  if (this.Data.message == '2weeks'&& this.Data.category == 'twenty'){
    this.amount = '36'
    this.product = twenty
    this.duration = 14
    this.description = 'Two week subscription'
    
 }
 if (this.Data.message == 'month'&& this.Data.category == 'twenty'){
   this.amount = '70'
   this.product = twenty
   this.duration = 31
   this.description = 'One month subscription'
   
 }
 if (this.Data.message == 'week' && this.Data.category == 'vvip'){
  this.amount = '15'
  this.duration = 7
  this.product = vvip
  this.description = 'One week subscription'
  
}
if (this.Data.message == '2weeks'&& this.Data.category == 'vvip'){
  this.amount = '28'
  this.product = vvip
  this.duration = 14
  this.description = 'Two week subscription'
 
}
if (this.Data.message == 'month'&& this.Data.category == 'vvip'){
 this.amount = '52'
 this.product = vvip
 this.duration = 31
 this.description = 'One month subscription'

}
  }
  async updateUserData(email: string) {
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
        paymentId:'google payments',  // Spread the existing data you want to update
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

  



}


