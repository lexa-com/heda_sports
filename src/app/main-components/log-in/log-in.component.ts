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
  styleUrls: ['./log-in.component.css']  // Fixed typo in styleUrls
})
export class LogInComponent {

  isLogin: boolean = true;
  isResetPassword: boolean = false;  // Added for toggling password reset form
  email: string = '';
  password: string = '';
  username: string = '';

  status: any;
  user: any;
  fivestatus: any;
  fiveDays: number=0;
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

  constructor(
    private auth: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  // Toggle between login and sign-up forms
  toggleForm(isLogin: boolean) {
    this.isLogin = isLogin;
    this.isResetPassword = false;  // Reset password form should be hidden when toggling forms
  }

  // Toggle the password reset form
  toggleResetPassword() {
    this.isResetPassword = !this.isResetPassword;
  }

  // Login function
  logIn() {
    if (this.email.trim() === '') {
      this.snackBar.open('Please enter your email', '', { duration: 3000 });
      return;
    }
    if (this.password.trim() === '') {
      this.snackBar.open('Please enter your password', '', { duration: 3000 });
      return;
    }
  
    this.auth.logIn(this.email, this.password)
      .then(() => {
        this.sendAuthStatus(['authenticated', this.email]);
        this.email = '';
        this.password = '';
        this.router.navigate(['/premium/home']);
      })
      .catch(err => {
        this.snackBar.open(err.message || 'Login failed', '', { duration: 3000 });
      });
  }

  // Sign-up function
  async signUpUser() {
    if (this.email === '' || this.password === '') {
      this.snackBar.open('Please fill out all fields', '', { duration: 3000 });
      return;
    }
  
    try {
      await this.auth.signUp(this.email, this.password);
      const userDoc = this.firestore.collection('users').doc(this.email);
      const date = new Date().toISOString();

      await userDoc.set({
        email: this.email,
        createdAt: date,
        admin: 'No',
        ten: `No+${date}+0`,
        five: `No+${date}+0`,
        twenty: `No+${date}+0`,
        vvip: `No+${date}+0`,
        tipster1: `No+${date}+0`,
        tipster2: `No+${date}+0`,
      });

      this.email = '';
      this.password = '';
      this.router.navigate(['/premium/home']);
    } catch (error) {
      this.snackBar.open('Signup failed', '', { duration: 3000 });
    }
  }

  // Handle password reset
  resetPassword() {
    if (this.email.trim() === '') {
      this.snackBar.open('Please enter your email to reset password', '', { duration: 3000 });
      return;
    }
    this.auth.resetPassword(this.email)
      .then(() => {
        this.snackBar.open('Password reset link sent to your email', '', { duration: 3000 });
        this.toggleResetPassword();  // Hide the reset password form
      })
      .catch(error => {
        this.snackBar.open(error.message || 'Error sending password reset link', '', { duration: 3000 });
      });
  }

  sendAuthStatus(auth: any) {
    this.sharedService.authCheck(auth);
  }

  // Fetch subscriptions and check remaining days
  getSubscriptions() {
    this.sharedService.userArray.subscribe((res) => {
      this.user = res[0];
      this.updateEmail = this.user.email;
      this.fivestatus = this.user.five.split('+')[0];
      this.fiveDays = this.calculateDaysRemaining(this.user.five.split('+')[1]);
      this.tenStatus = this.user.ten.split('+')[0];
      this.tenDays = this.calculateDaysRemaining(this.user.ten.split('+')[1]);
      this.twentyStatus = this.user.twenty.split('+')[0];
      this.twentyDays = this.calculateDaysRemaining(this.user.twenty.split('+')[1]);
      this.vvipStatus = this.user.vvip.split('+')[0];
      this.vvipDays = this.calculateDaysRemaining(this.user.vvip.split('+')[1]);
      this.tip1Status = this.user.tipster1.split('+')[0];
      this.tip1Days = this.calculateDaysRemaining(this.user.tipster1.split('+')[1]);
      this.tip2Status = this.user.tipster2.split('+')[0];
      this.tip2Days = this.calculateDaysRemaining(this.user.tipster2.split('+')[1]);

      this.removeExpiredSubscriptions();
    });
  }

  // Calculate days remaining for a subscription
  calculateDaysRemaining(subscriptionEndDate: string): number {
    const currentDate = new Date();
    const daysRemaining = differenceInDays(new Date(subscriptionEndDate), currentDate);
    return daysRemaining > 0 ? daysRemaining : 0;
  }

  // Remove expired subscriptions
  removeExpiredSubscriptions() {
    if (this.fiveDays === 0 && this.fivestatus === 'Yes') {
      this.updateUserData(this.updateEmail, 'five');
    }
    if (this.tip2Days === 0 && this.tip2Status === 'Yes') {
      this.updateUserData(this.updateEmail, 'tipster2');
    }
  }

  // Update user's subscription status
  async updateUserData(email: string, product: string) {
    try {
      const userDocRef = this.firestore.collection('users').doc(email);
      const today = new Date().toISOString();
      const status = `No+${today}+0`;

      await userDocRef.update({ [product]: status });
      this.readUserData(email);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  // Read user data from Firestore
  async readUserData(email: string) {
    try {
      const userDocRef = doc(this.firestore.firestore, 'users', email);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        this.userData = userDocSnapshot.data();
        this.sendUserArray([this.userData]);
        this.getSubscriptions();
      } else {
        console.log('No user found with this email.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // Update the shared user array
  sendUserArray(userArray: any) {
    this.sharedService.changeUserArray(userArray);
  }
}
