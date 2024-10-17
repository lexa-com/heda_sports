import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  constructor(
    public dialogRef: MatDialogRef<PremiumPaywallComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private router: Router,
    private sharedService: SharedService,
  private firestore: AngularFirestore,
  private renderer: Renderer2
  
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
     // const planId = 'P-082474874C560743BM4IK7CI'
     const planId = 'P-99317956WH774545JM4IQ4HY'
      const color = 'blue'
      this.subscribeTips(planId,color)
      
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'five'){
       this.amount = '13'
       this.product = five
       this.duration = 14
       this.description = 'Two week subscription'
       const planId = 'P-1WB310650S661874XM4IQ43Y'
       const color = 'silver'
       this.subscribeTips(planId,color)
       
    }
    if (this.Data.message == 'month'&& this.Data.category == 'five'){
      this.amount = '25'
      this.product = five
      this.duration = 31
      this.description = 'One month subscription'
      const planId = 'P-6M0852982T140182UM4IQ5KY'
      const color = 'gold'
      this.subscribeTips(planId,color)
      
    }
    if (this.Data.message == 'week' && this.Data.category == 'ten'){
      this.amount = '12'
      this.duration = 7
      this.product = ten
      this.description = 'One week subscription'
      const planId = 'P-4WK97370N64494356M4IQYHA'
      const color = 'blue'
      this.subscribeTips(planId,color)
     
    }
    if (this.Data.message == '2weeks'&& this.Data.category == 'ten'){
      this.amount = '22'
      this.product = ten
      this.duration = 14
      this.description = 'Two week subscription'
      const planId = 'P-0LB42947YM084253VM4IQYUQ'
      const color = 'silver'
      this.subscribeTips(planId,color)
      
   }
   if (this.Data.message == 'month'&& this.Data.category == 'ten'){
     this.amount = '42'
     this.product = ten
     this.duration = 31
     this.description = 'One month subscription'
     const planId = 'P-5B589880X08477549M4IQZBA'
     const color = 'silver'
     this.subscribeTips(planId,color)
     
   }
   if (this.Data.message == 'week' && this.Data.category == 'twenty'){
    this.amount = '20'
    this.duration = 7
    this.product = twenty
    this.description = 'One week subscription'
    const planId = 'P-4HT719118M860840GM4IQNVA'
    const color = 'blue'
    this.subscribeTips(planId,color)
    
  }
  if (this.Data.message == '2weeks'&& this.Data.category == 'twenty'){
    this.amount = '36'
    this.product = twenty
    this.duration = 14
    this.description = 'Two week subscription'
    const planId = 'P-3KS505893K8322058M4IQOIA'
    const color = 'silver'
    this.subscribeTips(planId,color)
    
 }
 if (this.Data.message == 'month'&& this.Data.category == 'twenty'){
   this.amount = '70'
   this.product = twenty
   this.duration = 31
   this.description = 'One month subscription'
   const planId = 'P-8KU26542JC327674KM4IQO7A'
   const color = 'gold'
   this.subscribeTips(planId,color)
   
 }
 if (this.Data.message == 'week' && this.Data.category == 'vvip'){
  this.amount = '15'
  this.duration = 7
  this.product = vvip
  this.description = 'One week subscription'
  const planId = 'P-8S112507V69435831M4IQD6Q'
  const color = 'blue'
  this.subscribeTips(planId,color)
  
}
if (this.Data.message == '2weeks'&& this.Data.category == 'vvip'){
  this.amount = '28'
  this.product = vvip
  this.duration = 14
  this.description = 'Two week subscription'
  const planId = 'P-6J047594JN182810WM4IQI4Q'
  const color = 'silver'
  this.subscribeTips(planId,color)
 
}
if (this.Data.message == 'month'&& this.Data.category == 'vvip'){
 this.amount = '52'
 this.product = vvip
 this.duration = 31
 this.description = 'One month subscription'
 const planId = 'P-4U474313E60665733M4IQKCQ'
  const color = 'gold'
  this.subscribeTips(planId,color)

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
        paymentId:'paypal payments',  // Spread the existing data you want to update
      };
  
      // Update the document with the updated data
      await userDocRef.update(updatedData);  
      this.readUserData(email)
      
    } catch (error) {
      
    }
  }
  async readUserData(email: string) {
    try {
      const userDocRef = doc(this.firestore.firestore, 'users', email);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        this.userData = userDocSnapshot.data(); 
        this.sendUserArray([this.userData])
        this.cancelTransaction()
        
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
  subscribeTips(planId:any,btnColor:any) {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AaGlpQzv2w40QpZ1bb2UcezSwjUCT1VHYjzW_KIY5ULxfnfPMYycVakHl0rVABwbvDT8lGpFWhMNFmQ7&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    document.body.appendChild(script);
  
    script.onload = () => {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: btnColor,
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


