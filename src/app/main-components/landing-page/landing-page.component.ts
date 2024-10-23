import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { VvipService } from '../../Services/vip.service/vvip.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {



  sideBarOpen = true;
  userData: any;
  constructor(
    private dataService: GamesService,
    private vipService:VvipService,
    private router: Router,
    private sharedService: SharedService,
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.fetchGames(); // Only call fetchGames in the browser
      }
    }

  async fetchGames() {
    try {
      const userDocRef = doc(this.firestore.firestore, 'games', 'matches');
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        this.userData = userDocSnapshot.data();
        
        this.sendArray(this.userData.games);
        this.sendVipArray(this.userData.games);
      } else {
        console.log('No user found with this email.');
      }
    } catch (error) {
      console.error('Error fetching games:', error); // Log the error for debugging
    }
  }
  

    sendArray(gamesArray:any) {
      this.sharedService.changeArray(gamesArray);
    }
    sendVipArray(gamesArray:any) {
      this.sharedService.changeVipArray(gamesArray);
    }
}
