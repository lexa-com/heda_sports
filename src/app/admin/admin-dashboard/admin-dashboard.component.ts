import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { VvipService } from '../../Services/vip.service/vvip.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessagesComponent } from '../../main-components/contacts/messages/messages.component';
import { GameDetailsComponent } from '../admin-update-games/game-details/game-details.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  dialogConfig: MatDialogConfig<any> | undefined;

totalUsers: any;
userData: any[] = [];
allUsers: any[] = [];
messages: any[] = [];
totalMessages: any;

constructor(private firestore: AngularFirestore,
  private router: Router,
  private messagesService:VvipService,
  private dialog: MatDialog,
){

}

  ngOnInit(): void {
    this.getAllUsers()
    this.getMessages()
    this.dialogConfig = new MatDialogConfig();
  }

  getMessages(){
this.messagesService.getMessage().subscribe((res=>{
  console.log(res)
   this.totalMessages = res.length
   this.messages = res

}))

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

  userMessage(message:any){
    const dialogRef = this.dialog.open(MessagesComponent, {
      width: '400px',
      height:'520px',
      data:message
    });

  }

  navigate() {
    this.router.navigate(['update/games'])
    }

    addGame(){
      const message = 'add'
      const dialogRef = this.dialog.open(GameDetailsComponent, {
        width: '700px',
        height:'520px',
        data:message
      });
    }

    addTipsterGame() {
      this.router.navigate(['update/tipster'])
    }
    tipsterGames() {
      this.router.navigate(['update/tipster/games'])
      }
}
