import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
buttonColor:any = "black";
  buttonType:any = "buy";
  isCustomSize:any = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;
 
 authLive:any;

  constructor(
    public dialogRef: MatDialogRef<TipsterPaywallComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private router: Router,
    private sharedService: SharedService,
  private firestore: AngularFirestore
  ) {}

  paymentRequest:any = this.Data.req

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
    this.product = `${this.Data.message} Daily Tips`
    this.amount = this.Data.category
    this.description = `Get ${this.Data.message}'s Curated tips for 2 weeks`
    this.duration = 15
     
    
  }
  async updateUserData(email: string) {
    try {
      const userDocRef = this.firestore.collection('users').doc(email);
      const today = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + this.duration);

      const tipsterName = this.Data.id
      const expiry = tipsterName + 'Date'
      const updatedData = {
        [tipsterName] : `Yes+${sevenDaysLater.toISOString()}+15`,
        paymentId:'google pay',  
          
      };
  
      await userDocRef.update(updatedData);  
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
        this.dialogRef.close();
        
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



