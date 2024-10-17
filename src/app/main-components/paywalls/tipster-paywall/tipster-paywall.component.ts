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
 authLive:any;

  constructor(
    public dialogRef: MatDialogRef<TipsterPaywallComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private router: Router,
    private sharedService: SharedService,
  private firestore: AngularFirestore
  ) {}

ngOnInit(): void {
  this.prepareReceipt() 
   
  }
  cancelTransaction() {
    this.dialogRef.close();
  }
 
  prepareReceipt(){
    this.product = `${this.Data.message} Daily Tips`
    this.amount = this.Data.category
    this.description = `Get ${this.Data.message}'s Curated tips for 1 month`
    this.duration = 15

    if (this.Data.id =='tipster1'){
      const planId = 'P-7T444693D0849280BM4IRB7Q'
       this.makeSubscription(planId)

    }else if (this.Data.id =='tipster2'){
      const planId = 'P-9WK507662N944883LM4IRBPA'
      this.makeSubscription(planId)
    }
     
    
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

  makeSubscription(planId:any){

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AaGlpQzv2w40QpZ1bb2UcezSwjUCT1VHYjzW_KIY5ULxfnfPMYycVakHl0rVABwbvDT8lGpFWhMNFmQ7&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    document.body.appendChild(script);
  
    script.onload = () => {
      paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function (data: any, actions: { subscription: { create: (arg0: { plan_id: string }) => any } }) {
          return actions.subscription.create({
            plan_id: planId
          });
        },
        onApprove: (data: { subscriptionID: any }, actions: any) => {
          this.updateUserData(this.Data.email);
        }
      }).render(`#paypal-button-container-${planId}`);
    };
  }
  

}



