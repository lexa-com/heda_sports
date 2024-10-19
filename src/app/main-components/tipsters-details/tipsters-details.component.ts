import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-tipsters-details',
  templateUrl: './tipsters-details.component.html',
  styleUrls: ['./tipsters-details.component.css']
})
export class TipstersDetailsComponent implements OnInit {

  matchDays: any[] = [];
  gameData: any;

  constructor(private gamesService: GamesService,
    private router:Router,
    private sharedService:SharedService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.queryParams) {
      this.gameData = navigation.extras.queryParams['tipster'];
  
    } else {
      this.gameData = null;
      
    } 
  }


  getTip2(){
    this.sharedService.tipster2Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchDays = matchDays
        .filter(day => day.date < formattedToday)
        
    });

  }
  getTip1(){
  
    this.sharedService.tipster1Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today);
      this.matchDays = matchDays
        .filter(day => day.date < formattedToday)
        
    });

  }

    ngOnInit(): void {

      if(this.gameData =='tip1'){
        this.getTip1()
      }
      if (this.gameData=='tip2'){
        this.getTip2()
      }
      
    }
  
    // Helper method to format date to dd-mm-yyyy
    formatDateToDDMMYYYY(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based, so add 1) and pad
      const year = date.getFullYear(); // Get full year
  
      return `${day}-${month}-${year}`; // Return formatted string
    }
  }
