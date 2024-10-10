import { Component } from '@angular/core';
import { GamesService } from './Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from './Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Heda_sports';
  sideBarOpen= true;

 fixtures: any = [];
 userData: any;

constructor(
  private dataService: GamesService,
  private router: Router,
  private sharedService: SharedService,
  private firestore: AngularFirestore
  ) { }

ngOnInit(): void {
  this.fetchGames()
  this.getUserInfo()
}

fetchGames(){
this.dataService.getGames().subscribe((res)=>{
this.fixtures = res
this.sendArray(this.fixtures)
  
})

}

sendArray(gamesArray:any) {
  this.sharedService.changeArray(gamesArray);
}

sendUserArray(userArray:any) {
  this.sharedService.changeUserArray(userArray);
}

getUserInfo(){
this.sharedService.currentAuthStatus.subscribe((res)=>{

  if (res.length == 0){
     console.log('not authenticated')
  } else {
    const email = res[1]
    this.readUserData(email)
  }
  
})

}


async readUserData(email: string) {
  try {
    const userDocRef = doc(this.firestore.firestore, 'users', email); // Reference to the user's document
    const userDocSnapshot = await getDoc(userDocRef); // Fetch the document

    if (userDocSnapshot.exists()) {
      this.userData = userDocSnapshot.data(); // Retrieve document data
      this.sendUserArray([this.userData])
      console.log('User data retrieved:', this.userData);
    } else {
      console.log('No user found with this email.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

}

