import { Component } from '@angular/core';
import { GamesService } from './Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from './Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { VvipService } from './Services/vip.service/vvip.service';

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
  Vipfixtures: any;
  matchDays: any[] = [];
  matchDays2: any[] = [];

constructor(
  private dataService: GamesService,
  private vipService:VvipService,
  private router: Router,
  private sharedService: SharedService,
  private firestore: AngularFirestore
  ) { }

ngOnInit(): void {
  this.fetchGames()
  this.getUserInfo()
  this.getVipGames()
  this.getTip1()
  this.getTip2()
}

fetchGames(){
this.dataService.getGames().subscribe((res)=>{
this.fixtures = res
console.log(res)
this.sendArray(this.fixtures)
  
})

}
getVipGames(){
  this.vipService.getGames().subscribe((res)=>{
    this.Vipfixtures = res
    this.sendVipArray(this.Vipfixtures)
      
    })
}

sendArray(gamesArray:any) {
  this.sharedService.changeArray(gamesArray);
}
sendVipArray(gamesArray:any) {
  this.sharedService.changeVipArray(gamesArray);
}

sendUserArray(userArray:any) {
  this.sharedService.changeUserArray(userArray);
}

getUserInfo(){
this.sharedService.currentAuthStatus.subscribe((res)=>{

  if (res.length == 0){
     
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
      
    } else {
      console.log('No user found with this email.');
    }
  } catch (error) {
    
  }
}

getTip2(){
  const category = 'tipster2'; // Replace with your actual category

  this.dataService.getAllMatchDays(category).subscribe((matchDays: any[]) => {
    this.matchDays2 = matchDays
      .reverse(); 

      this.sendTip2Array(this.matchDays2)    
  });

}
getTip1(){
  const category = 'tipster1'; // Replace with your actual category

  this.dataService.getAllMatchDays(category).subscribe((matchDays: any[]) => {
    this.matchDays = matchDays
      .reverse(); 
   this.sendTip1Array(this.matchDays)
  });

}
sendTip1Array(gamesArray:any) {
  this.sharedService.changeTip1Array(gamesArray);
}
sendTip2Array(gamesArray:any) {
  this.sharedService.changeTip2Array(gamesArray);
}

}

