import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  userData:any;
email: any;

user: any = {
  fiveLabel: '',
  five: '',
  fivePackage: 0,
  tenLabel: '',
  ten: '',
  tenPackage: 0,
  twentyLabel: '',
  twenty: '',
  twentyPackage: 0,
  vvipLabel: '',
  vvip: '',
  vvipPackage: 0,
  tipster1Label: '',
  tipster1: '',
  tipster1Package: 0,
  tipster2Label: '',
  tipster2: '',
  tipster2Package: 0
};

  constructor(private router: Router,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
  ) 
  
  {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.queryParams) {
      this.userData = navigation.extras.queryParams['userData'];
    } else {
      this.snackBar.open('No user data found in query params.', '', { duration: 3000 });
      this.userData = null;
    }
  }
  ngOnInit(): void {
    this.setUpUserData()
   
  }

  setUpUserData(){
    this.user = {
      email: this.userData.email,
      tipster2Label:this.userData.tipster2.split('+')[0],
      five: this.userData.five.split('+')[2],
      fiveLabel:this.userData.five.split('+')[0],
      ten: this.userData.ten.split('+')[2],
      tenLabel:this.userData.ten.split('+')[0],
      twenty: this.userData.twenty.split('+')[2],
      twentyLabel:this.userData.twenty.split('+')[0],
      vvip: this.userData.vvip.split('+')[2],
      vvipLabel:this.userData.vvip.split('+')[0],
      tipster1: this.userData.tipster1.split('+')[2],
      tipster1Label:this.userData.tipster1.split('+')[0],
      tipster2: this.userData.tipster2.split('+')[2],
    };
  }

  
  onSubmit() {
    console.log('User data:', this.user);
  }

  logRow(row: string) {
    const emails = this.userData.email
    switch (row) {
      case 'five':
        console.log('5+ Tips Row:', {
          Label: this.user.fiveLabel,
          Days: this.user.five,
          Package: this.user.fivePackage
        });
        this.updateUserData(emails,this.user.fivePackage,this.user.fiveLabel,'five')
        break;
      case 'ten':
        console.log('10+ Tips Row:', {
          Label: this.user.tenLabel,
          Days: this.user.ten,
          Package: this.user.tenPackage
        });
        this.updateUserData(emails,this.user.tenPackage,this.user.tenLabel,'ten')
        break;
      case 'twenty':
        console.log('20+ Tips Row:', {
          Label: this.user.twentyLabel,
          Days: this.user.twenty,
          Package: this.user.twentyPackage
        });
        this.updateUserData(emails,this.user.twentyPackage,this.user.twentyLabel,'twenty')
        break;
      case 'vvip':
        console.log('VVIP Tips Row:', {
          Label: this.user.vvipLabel,
          Days: this.user.vvip,
          Package: this.user.vvipPackage
        });
        this.updateUserData(emails,this.user.vvipPackage,this.user.vvipLabel,'vvip')
        break;
      case 'tipster1':
        console.log('Liam Tips Row:', {
          Label: this.user.tipster1Label,
          Days: this.user.tipster1,
          Package: this.user.tipster1Package
        });
        this.updateUserData(emails,this.user.tipster1Package,this.user.tipster1Label,'tipster1')
        break;
      case 'tipster2':
        console.log('Andrew Tips Row:', {
          Label: this.user.tipster2Label,
          Days: this.user.tipster2,
          Package: this.user.tipster2Package
        });
        this.updateUserData(emails,this.user.tipster2Package,this.user.tipster2Label,'tipster2')
        break;
      default:
        console.error('Unknown row:', row);
    }
  }
  
  async updateUserData(email: string, days: any,label:any,category:any) {
    try {
      const userDocRef = this.firestore.collection('users').doc(email);
  
      // Get current date and time
      const today = new Date();
      const sevenDaysLater = new Date();

      sevenDaysLater.setDate(today.getDate() + days);

      const expiryDate = sevenDaysLater.toISOString().split('T')[0]

      const status = `${label}+${expiryDate}+${days}`
      const updatedData = {
        [category]: status,
      };
      await userDocRef.update(updatedData);  
      
      this.snackBar.open('User data updated successfully', '', { duration: 3000 });
      
    } catch (error) {
      
      this.snackBar.open('Error updating user data:', '', { duration: 3000 });
    }
  }

}
