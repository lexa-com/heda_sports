import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../../Services/games.service';
import { SharedService } from '../../Services/shared.service';
import { GameDetailsComponent } from '../../admin/admin-update-games/game-details/game-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-wins',
  templateUrl: './home-wins.component.html',
  styleUrl: './home-wins.component.css'
})
export class HomeWinsComponent implements OnInit {

  fixtures: any = [];
  pickedDate: any;
    overGames: any[] = [];
    data: any[]=[];
  authorize: boolean =false;
totalOdds: any;
  
  constructor(
    private dataService: GamesService,
    private router: Router,
    private dialog: MatDialog,
    private sharedService: SharedService
    ) { }
  
  ngOnInit(): void {
    this.setTodayDate()
    this.fetchGames()
    this.checkAuth()
  }
  
  
  fetchGames(){
  this.sharedService.currentArray.subscribe((res)=>{
    this.data = res
  this.overGames = res.filter(item => item.category === "2" && item.date == this.pickedDate)
  this.fixtures = this.overGames
  this.totalOdds = this.fixtures.reduce((sum: number, item: { odds: string; }) => {
    const odds = parseFloat(item.odds) || 0; 
    return sum + odds;
  }, 0).toFixed(2); 
  
  })
  
  }
  
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(input.value);
    
    const formattedDate = this.formatDate(selectedDate);
    this.pickedDate = formattedDate
    this.fixtures = this.data.filter(item => item.date == formattedDate && item.category ==="2")
    this.totalOdds = this.fixtures.reduce((sum: number, item: { odds: string; }) => {
      const odds = parseFloat(item.odds) || 0; 
      return sum + odds;
    }, 0).toFixed(2);
    
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
   
  }
  


  modifyGame(game:any){
    const dialogRef = this.dialog.open(GameDetailsComponent, {
      width: '520px',
      height:'520px',
      data:{
        match:game,
        category:"update"
      }
    });

  }
  checkAuth(){
    this.sharedService.currentAuthStatus.subscribe((res)=>{
    if (res[0]=='authenticated'){
      this.sharedService.userArray.subscribe((res)=>{
        if (res[0].admin=='Yes'){
          this.authorize = true
    
        }
      })
    }
    })  
      }
  
  }
  

