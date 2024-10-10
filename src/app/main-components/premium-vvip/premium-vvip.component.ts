import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../../Services/games.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../Services/shared.service';
import { PremiumPaywallComponent } from '../paywalls/premium-paywall/premium-paywall.component';

@Component({
  selector: 'app-premium-vvip',
  templateUrl: './premium-vvip.component.html',
  styleUrl: './premium-vvip.component.css'
})
export class PremiumVvipComponent implements OnInit {

  fixtures: any = [];
  pickedDate: any;
    overGames: any[] = [];
    data: any[]=[];
    authenticated:boolean = true
    subscribed:boolean = true
    loggedIn:string = ''
    dialogConfig: MatDialogConfig<any> | undefined;
  
  constructor(
    private dataService: GamesService,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog,
    ) { }
  
  ngOnInit(): void {
    this.checkAuth()
    this.setTodayDate()
    this.fetchGames()
    this.dialogConfig = new MatDialogConfig();
    
  }
  
  
  fetchGames(){
  this.sharedService.currentArray.subscribe((res)=>{
    this.data = res
  this.overGames = res.filter(item => item.category === "5" && item.date == this.pickedDate)
  this.fixtures = this.overGames
  console.log(this.overGames)
  })
  
  }
  
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(input.value);
    
    const formattedDate = this.formatDate(selectedDate);
    this.pickedDate = formattedDate
    this.fixtures = this.data.filter(item => item.date == formattedDate && item.category ==="5")
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

  checkSubscription(){
    this.sharedService.userArray.subscribe((res)=>{
      const subscrib = res[0].five.split('+')[0]
      if (subscrib =='Yes'){
        this.authenticated = false
      }
    })
  }

  checkAuth(){
    this.sharedService.currentAuthStatus.subscribe((res)=>{
       if (res.length == 0){
            console.log('not authenticated')
       } else {
        this.checkSubscription()
       }
    })
  }

  openDialog(message: string) {
    this.sharedService.currentAuthStatus.subscribe((res) => {
      console.log(res);
      if (res[0] === 'authenticated') {
        const dialogRef = this.dialog.open(PremiumPaywallComponent, {
          width: '440px',
          data: {
            message: message, // category
            email: res[1],    // email
            category: 'vvip'
          }
        });
  
        // Handle dialog close and trigger actions
        dialogRef.afterClosed().subscribe((result) => {
          console.log('Dialog was closed');
          this.ngOnInit(); // Call the method after dialog close
        });
  
      } else {
        window.alert('Please Log in to continue');
      }
    });
  }
  
  
  }
  


