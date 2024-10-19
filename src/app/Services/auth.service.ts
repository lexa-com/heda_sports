import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar  // Injecting MatSnackBar for notifications
  ) { }

  logIn(email: string, password: string): Promise<void> {
    // Basic validation
    if (!email || !password) {
      this.snackBar.open('Please enter both email and password', '', { duration: 3000 });
      return Promise.reject('Email and password are required');
    }
  
    // Sign in with Firebase and return the Promise
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Retrieve the token if needed
        return userCredential.user?.getIdToken().then(token => {
          localStorage.setItem('token', token || email); // Store token
          this.snackBar.open('Login successful!', '', { duration: 3000 });
          this.router.navigate(['/dashboard']);
        });
      })
      .catch(err => {
        this.snackBar.open(err.message, '', { duration: 3000 });
        return Promise.reject(err); // Reject the Promise with the error
      });
  }
  

  

  logOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.snackBar.open('Logged out successfully!', '', { duration: 3000 });  // Logout feedback
      this.router.navigate(['/login']);  // Redirect to login after logout
    }).catch(err => {
      this.snackBar.open(err.message, '', { duration: 3000 });  // Error handling
    });
  }

  signUp(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      
      if (user) {
        user.sendEmailVerification().then(() => {
          this.snackBar.open('Account created! Please verify your email.', '', { duration: 5000 });  // Email verification notification
          this.router.navigate(['/login']);  // Redirect to login or verification page
        }).catch(err => {
          this.snackBar.open('Error sending verification email: ' + err.message, '', { duration: 3000 });
        });
      }
      
    }).catch(err => {
      this.snackBar.open(err.message, '', { duration: 3000 });  // Error notification
    });
  }

  resetPassword(email: string) {
    if (!email) {
      this.snackBar.open('Please enter your email address', '', { duration: 3000 });
      return Promise.reject('Email is required');
    }
  
    return this.fireAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.snackBar.open('Password reset email sent! Please check your inbox.', '', { duration: 5000 });
      })
      .catch((err) => {
        this.snackBar.open('Error: ' + err.message, '', { duration: 3000 });
        return Promise.reject(err);
      });
  }
  
}
