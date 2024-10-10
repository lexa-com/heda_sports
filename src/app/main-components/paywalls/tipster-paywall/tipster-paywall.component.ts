import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { SharedService } from '../../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tipster-paywall',
  templateUrl: './tipster-paywall.component.html',
  styleUrl: './tipster-paywall.component.css'
})
export class TipsterPaywallComponent implements OnInit {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  email:any = '';
product: any;
amount: any;
description: any;
duration: number = 0;
userData: any;

  constructor(
    public dialogRef: MatDialogRef<TipsterPaywallComponent>,
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
    this.product = `${this.Data.message} Daily Tips`
    this.amount = this.Data.category
    this.description = `Get ${this.Data.message}'s Curated tips for 2 weeks`
    this.duration = 15
    
    
  }
  async updateUserData(email: string, newData: any) {
    try {
      const userDocRef = this.firestore.collection('users').doc(email);
  
      // Get current date and time
      const today = new Date();
      
      // Get the date seven days in the future
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + this.duration);

      const tipsterName = this.Data.id
      const expiry = tipsterName + 'Date'
  
      // Add the dates to your new data object
      const updatedData = {
        [tipsterName] : `Yes+${sevenDaysLater.toISOString()}`,
        paymentId:newData.paymentID,  // Spread the existing data you want to upda          // Current date and time
          
      };
  
      // Update the document with the updated data
      await userDocRef.update(updatedData);  
      console.log('User data updated successfully');
      this.readUserData(email)
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
