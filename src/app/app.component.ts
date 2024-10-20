import { Component } from '@angular/core';
import { GamesService } from './Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from './Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { VvipService } from './Services/vip.service/vvip.service';

interface Game {
  id: string;
  games: string;
  ko: string;
  league: string;
  odds: string;
  predict: string;
  result: string;
  verdict: string;
}

interface DocumentData {
  games: Game[];  // Array of games
}

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
}

fetchGames(): Promise<Game[]> {
  const docRef = this.firestore.collection('games').doc('matches'); // Hardcoded collection and document

  return docRef.get().toPromise().then((docSnapshot) => {
    // Check if the document exists
    if (!docSnapshot || !docSnapshot.exists) {
      throw new Error('Document does not exist');
    }

    // Extract the games array from the document data
    const data = docSnapshot.data() as DocumentData;
    const gamesArray = data?.games || [];
    this.sendArray(gamesArray)
    this.sendVipArray(gamesArray)

    return gamesArray as Game[];
  }).catch((error) => {
    console.error('Error fetching games:', error);
    throw error;
  });
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
      this.userData = userDocSnapshot.data();
      
      if (this.userData.admin=='Yes'){
        this.getTip1()
        this.getTip2()
      } else if (this.userData.tipster1.split('+')[0]=='Yes'){
        this.getTip1()
      }else if (this.userData.tipster2.split('+')[0]=='Yes'){
        this.getTip2()
      }
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

