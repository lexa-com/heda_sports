import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-update-games',
  templateUrl: './admin-update-games.component.html',
  styleUrl: './admin-update-games.component.css'
})
export class AdminUpdateGamesComponent implements OnInit{

  
  dialogConfig: MatDialogConfig<any> | undefined;
  fixtures: any[] = [];
  pickedDate: any;
  data: any[] = [];
  overGames: any[] = [];
  
  constructor(
    private dataService: GamesService,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
      //this.checkSubscription()
      this.setTodayDate()
      this.fetchGames()
      this.dialogConfig = new MatDialogConfig();
      
    }
    
    
    fetchGames(){
    this.sharedService.currentArray.subscribe((res)=>{
      this.data = res
    this.overGames = res.filter(item => item.date == this.pickedDate)
    this.fixtures = this.overGames
    console.log(this.overGames)
    })
    
    }
    
    onDateChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      const selectedDate = new Date(input.value);
      
      const formattedDate = this.formatDate(selectedDate);
      this.pickedDate = formattedDate
      this.fixtures = this.data.filter(item => item.date == formattedDate)
      console.log('Formatted date:', formattedDate);
    }
    
    formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
    
      return `${day}-${month}-${year}`;
    }
    
    setTodayDate(): void {
      const today = new Date(); // Get today's date
      this.pickedDate = this.formatDate(today); // Format and set pickedDate
      //console.log('Today\'s date formatted:', this.pickedDate); // Log today's date
    }
    
    getVerdictEmoji(verdict: string): string {
      switch (verdict) {
        case 'win':
          return '✅✅✅'; // Trophy emoji
        case 'lost':
          return '❌'; // Cross mark emoji
        case 'post':
          return 'postponed'; // Handshake emoji
        default:
          return '-'; // Scales emoji for unknown verdict
      }
    }
  
    gameDetail(game: any) {
      console.log(game)

      this.router.navigate(['game/details'], 
        { queryParams: { gameData: game,category:"update"} });
      }
    
    
}
