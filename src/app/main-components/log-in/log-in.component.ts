import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { differenceInDays } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  isLogin: boolean = true;
  email:string    = ''
  password:string = ''
  username:string = ''

status: any;
  user: any;
fivestatus: any;
fiveDays: any;
  tenStatus: any;
  twentyStatus: any;
  vvipStatus: any;
  tip1Status: any;
  tip2Status: any;
  tenDays: any;
  twentyDays: any;
  vvipDays: any;
  tip1Days: any;
  tip2Days: any;
  updateEmail: any;
  userData: any;

  constructor(private auth: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
  ){


  }

  toggleForm(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  logIn() {
    // Input validation
    if (this.email.trim() === '') {
      this.snackBar.open('Please enter your email', '', { duration: 3000 });
      return;
    }
    if (this.password.trim() === '') {
      this.snackBar.open('Please enter your password', '', { duration: 3000 });
      return;
    }
  
    // Call the auth service and handle the returned Promise
    this.auth.logIn(this.email, this.password)
      .then(() => {
        console.log(this.email)
        this.sendAuthStatus(['authenticated',this.email])
        this.email = '';
        this.password = '';
        this.router.navigate(['/premium/home'])
        
      })
      .catch(err => {
        this.snackBar.open(err, '', { duration: 3000 }); // Display error message
      });
  }
    

  async signUpUser() {
    if (this.email === '') {
      alert('Please enter an email');
      return;
    }
    if (this.password === '') {
      alert('Please enter a password');
      return;
    }
  
    try {
      // Call the signUp method but no need to rely on userCredential to save the email
      await this.auth.signUp(this.email, this.password);
  
      // Save the user's email directly to Firestore
      const userDoc = this.firestore.collection('users').doc(this.email);

      const date = new Date().toISOString()

      await userDoc.set({
        email: this.email,  // Only saving the provided email
        createdAt: date,
        admin:`No`,
        ten:`No+${date }+0`,
        five:`No+${date}+0`,
        twenty:`No+${date}+0`,
        vvip:`No+${date}+0`,
        tipster1:`No+${date}+0`,
        tipster2:`No+${date}+0`,
      });
        
      // Clear the fields
      this.email = '';
      this.password = '';
    } catch (error) {
      // Handle errors (e.g., user already exists, weak password, etc.)
      //alert(error.message);
    }
  }
      

  sendAuthStatus(auth:any) {
    this.sharedService.authCheck(auth);
  }

  getSupscriptions() {
    this.sharedService.userArray.subscribe((res)=>{
      console.log(res)
      this.user = res[0]
      this.updateEmail = this.user.email
      this.fivestatus = this.user.five.split('+')[0]
       this.fiveDays = this.calculateDaysRemaining(this.user.five.split('+')[1].split('+')[0])
      this.tenStatus = this.user.ten.split('+')[0]
      this.tenDays = this.calculateDaysRemaining(this.user.ten.split('+')[1].split('+')[0])
      this.twentyStatus = this.user.twenty.split('+')[0]
      this.twentyDays = this.calculateDaysRemaining(this.user.twenty.split('+')[1].split('+')[0])
      this.vvipStatus = this.user.vvip.split('+')[0]
      this.vvipDays = this.calculateDaysRemaining(this.user.vvip.split('+')[1].split('+')[0])
      this.tip1Status = this.user.tipster1.split('+')[0]
      this.tip1Days = this.calculateDaysRemaining(this.user.tipster1.split('+')[1].split('+')[0])
      this.tip2Status = this.user.tipster2.split('+')[0]
      this.tip2Days = this.calculateDaysRemaining(this.user.tipster2.split('+')[1].split('+')[0])

      this.removeSubscription()
      
    })
  }

  calculateDaysRemaining(subscriptionEndDate:any): number {
    const currentDate = new Date();
    const daysRemaining = differenceInDays(subscriptionEndDate, currentDate);
    return daysRemaining > 0 ? daysRemaining : 0;
  }

  
  removeSubscription(){

    if (this.fiveDays == 0 && this.fivestatus == 'Yes'){
      this.updateUserData(this.updateEmail,'five')

    }
    if (this.tip2Days == 0 && this.tip2Status == 'Yes'){
      this.updateUserData(this.updateEmail,'tipster2')
      console.log('tipster2 ametoka')

    }


  }

  async updateUserData(email: string, product: any) {
    try {
      const userDocRef = this.firestore.collection('users').doc(email);
      const today = new Date();
      
      const status = `No+${today}+${0}`
      const updatedData = {
        [product]: status,
         
      };
  
      // Update the document with the updated data
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
       // console.log('User data retrieved:', this.userData);
        this.getSupscriptions()
      } else {
       // console.log('No user found with this email.');
      }
    } catch (error) {
      //console.error('Error fetching user data:', error);
    }
  }

  sendUserArray(userArray:any) {
    this.sharedService.changeUserArray(userArray);
  }

}

