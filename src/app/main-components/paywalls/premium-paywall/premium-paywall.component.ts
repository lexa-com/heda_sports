import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';

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
  private firestore: AngularFirestore
  ) {}

ngOnInit(): void {
  this.setUpPage()
  this.prepareReceipt()
  console.log(this.Data.email)
    
  }

  cancelTransaction() {
    this.dialogRef.close();
  }

  setUpPage() {
    
    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.amount,
                currency_code: 'USD'  // 'currency' should be 'currency_code'
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          this.updateUserData(this.Data.email,data)
          
        });
      },
      onError: (err: any) => {
        console.error('PayPal Button Error: ', err);
      }
    }).render(this.paymentRef.nativeElement);  // Render the PayPal button in the specified element
  }

  prepareReceipt(){
    const five = '5+ ODDS TIPS DAILY'
    const ten = '10+ ODDS TIPS DAILY'
    const twenty = '20+ ODDS TIPS DAILY'
    const vvip = 'DAILY VVIP TIPS'
    if (this.Data.message == 'week' && this.Data.category == 'five'){
      this.amount = '10'
      this.duration = 7
      this.product = five
      this.description = 'One week subscription'
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'five'){
       this.amount = '16'
       this.product = five
       this.duration = 14
       this.description = 'Two week subscription'
    }
    if (this.Data.message == 'month'&& this.Data.category == 'five'){
      this.amount = '36'
      this.product = five
      this.duration = 31
      this.description = 'One month subscription'
    }
    if (this.Data.message == 'week' && this.Data.category == 'ten'){
      this.amount = '15'
      this.duration = 7
      this.product = ten
      this.description = 'One week subscription'
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'ten'){
      this.amount = '28'
      this.product = ten
      this.duration = 14
      this.description = 'Two week subscription'
   }
   if (this.Data.message == 'month'&& this.Data.category == 'ten'){
     this.amount = '55'
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
    this.amount = '38'
    this.product = twenty
    this.duration = 14
    this.description = 'Two week subscription'
 }
 if (this.Data.message == 'month'&& this.Data.category == 'twenty'){
   this.amount = '75'
   this.product = twenty
   this.duration = 31
   this.description = 'One month subscription'
 }
 if (this.Data.message == 'week' && this.Data.category == 'vvip'){
  this.amount = '20'
  this.duration = 7
  this.product = vvip
  this.description = 'One week subscription'
}
if (this.Data.message == '2weeks'&& this.Data.category == 'vvip'){
  this.amount = '38'
  this.product = vvip
  this.duration = 14
  this.description = 'Two week subscription'
}
if (this.Data.message == 'month'&& this.Data.category == 'vvip'){
 this.amount = '75'
 this.product = vvip
 this.duration = 31
 this.description = 'One month subscription'
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
      console.log('User data updated successfully');
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
        console.log('User data retrieved:', this.userData);
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


