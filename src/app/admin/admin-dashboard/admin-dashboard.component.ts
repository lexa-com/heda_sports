import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {


totalUsers: any;
userData: any[] = [];
allUsers: any[] = [];

constructor(private firestore: AngularFirestore,
  private router: Router
){

}

  ngOnInit(): void {
    this.getAllUsers()
  }

async getAllUsers() {
  try {
    const usersCollectionRef = collection(this.firestore.firestore, 'users'); // Reference to the users collection
    const usersSnapshot = await getDocs(usersCollectionRef); // Fetch all documents in the collection
    
    this.allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Store the retrieved users
    console.log('All users retrieved:', this.allUsers);
    this.totalUsers = this.allUsers.length
  } catch (error) {
    console.error('Error fetching all users:', error);
  }
}

userDetails(user: any) {
  this.router.navigate(['user/details'], 
    { queryParams: { userData: user} });
  }

  navigate() {
    this.router.navigate(['update/games'])
    }

    addGame(){
      this.router.navigate(['game/details'], 
        { queryParams: { category:"add"} });
    }
}
