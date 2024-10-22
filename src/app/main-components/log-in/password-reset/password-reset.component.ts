import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../../../Services/shared.service';
import { GamesService } from '../../../Services/games.service';
import { AuthService } from '../../../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit {


  dialogConfig: MatDialogConfig<any> | undefined;

  email: string = '';
  password: string = '';
  username: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PasswordResetComponent>,
  ) {}

  ngOnInit(): void {
   
  }

  closeDial() {
    this.dialogRef.close()
  }
 

  resetPassword() {
    if (this.email.trim() === '') {
      this.snackBar.open('Please enter your email to reset password', '', { duration: 3000 });
      return;
    }
    this.auth.resetPassword(this.email)
      .then(() => {
        this.snackBar.open('Password reset link sent to your email', '', { duration: 3000 });
        this.dialogRef.close()
      })
      .catch(error => {
        this.snackBar.open(error.message || 'Error sending password reset link', '', { duration: 3000 });
      });
  }

}
