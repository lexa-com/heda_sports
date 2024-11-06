import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { TipsterAddGamesComponent } from '../../admin/tipster-add-games/tipster-add-games.component';
import { TipsterGameUpdateComponent } from '../../admin/tipster-games/tipster-game-update/tipster-game-update.component';

@Component({
  selector: 'app-tipsters-details',
  templateUrl: './tipsters-details.component.html',
  styleUrls: ['./tipsters-details.component.css']
})
export class TipstersDetailsComponent implements OnInit {

  matchDays: any[] = [];
  gameData: any;
  authorize:boolean = false

  constructor(private gamesService: GamesService,
    private router:Router,
    private sharedService:SharedService,
    private dialog: MatDialog,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.queryParams) {
      this.gameData = navigation.extras.queryParams['tipster'];
  
    } else {
      this.gameData = null;
    } 
  }

  getTip2() {
    this.sharedService.tipster2Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today); // Using your formatter
  
      // Filter and group matches by date, retaining formatted dates
      const groupedByDate = matchDays
        .filter(day => {
          // Compare day.date with formattedToday directly, assuming day.date is in the same format
          return day.date < formattedToday; // Only include dates before today
        })
        .reduce((acc, day) => {
          // Group by original date string
          if (!acc[day.date]) {
            acc[day.date] = { date: day.date, matches: [] };
          }
          acc[day.date].matches.push(day);
          return acc;
        }, {} as Record<string, { date: string; matches: any[] }>);
  
      // Convert grouped object to an array format
      this.matchDays = Object.values(groupedByDate);
      
    });
  }
  

  getTip1(){
  
    this.sharedService.tipster1Array.subscribe((matchDays: any[]) => {
      const today = new Date();
      const formattedToday = this.formatDateToDDMMYYYY(today); // Using your formatter
  
      // Filter and group matches by date, retaining formatted dates
      const groupedByDate = matchDays
        .filter(day => {
          // Compare day.date with formattedToday directly, assuming day.date is in the same format
          return day.date < formattedToday; // Only include dates before today
        })
        .reduce((acc, day) => {
          // Group by original date string
          if (!acc[day.date]) {
            acc[day.date] = { date: day.date, matches: [] };
          }
          acc[day.date].matches.push(day);
          return acc;
        }, {} as Record<string, { date: string; matches: any[] }>);
  
      // Convert grouped object to an array format
      this.matchDays = Object.values(groupedByDate);
      
    });

  }

    ngOnInit(): void {
      this.checkAuth()

      if(this.gameData =='tip1'){
        this.getTip1()
      }
      if (this.gameData=='tip2'){
        this.getTip2()
      }
      
    }

    checkAuth(){
      this.sharedService.userArray.subscribe((res)=>{
        if(res.length==0){
          return
        }
        if (res[0].admin =='Yes'){
          this.authorize = true
        }
      })
    }
  
    formatDateToDDMMYYYY(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0'); 
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    modifyGame(game:any){
      const dialogRef = this.dialog.open(TipsterGameUpdateComponent, {
        width: '520px',
        height:'520px',
        data:{
          match:game,
          category:"update",
          tipster:this.gameData
        }
      });
  
    }
  }
