import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GamesService } from '../../Services/games.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TipsterPaywallComponent } from '../paywalls/tipster-paywall/tipster-paywall.component';

@Component({
  selector: 'app-tipsters-view',
  templateUrl: './tipsters-view.component.html',
  styleUrl: './tipsters-view.component.css'
})
export class TipstersViewComponent implements OnInit {
  dialogConfig: MatDialogConfig<any> | undefined;
tipsterOne: boolean = false;
tipsterTwo: boolean = false;
  subscription: any;
  subscriptionOne: any;
  subscriptionTwo: any;

  constructor(
    private dataService: GamesService,
    private router: Router,
    private sharedService: SharedService,
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    ) { }
 
  tipsters = [
    {
      countryFlag: '🏴', // Emoji flag for country
      name: 'Liam Reese',
      id:'tipster1',
      date: new Date('2024-10-04'),
      results: [
        { team1: 'Dordrecht', team2: 'Jong PSV Eindhoven', tip: '-2.5', odd: 2.40 },
        { team1: 'Vitesse', team2: 'Volendam', tip: '-2.5', odd: 2.40 },
        { team1: 'Slavia Prague', team2: 'Ajax', tip: 'BTS', odd: 1.90 },
        { team1: 'Omonia Nicosia', team2: 'Vikingur Reykjavik', tip: '+2.5', odd: 1.69 }
      ],
      form: '17/10',
      success: 71,
      avgOdd: 1.73,
      price1Week: 119.00,
      price2Weeks: 179.00
    },
    {
      countryFlag: '🚩',
      name: 'Andrew Wilson',
      id:'tipster2',
      date: new Date('2024-10-04'),
      results: [
        { team1: 'Karlsruhe', team2: 'Darmstadt', tip: 'BTS', odd: 1.65 },
        { team1: 'Jong Utrecht', team2: 'Telstar', tip: 'BTS', odd: 1.65 },
        { team1: 'Etoile-Carouge', team2: 'Nyon', tip: '1', odd: 1.61 },
        
      ],
      form: '16/10',
      success: 70,
      avgOdd: 1.79,
      price1Week: 119.00,
      price2Weeks: 179.00
    },
    {
      countryFlag: '🏴',
      name: 'Charlie Cook',
      id:'tipster3',
      date: new Date('2024-10-04'),
      results: [
        { team1: 'Neuchatel Xamax', team2: 'Sion', tip: 'BTS', odd: 1.65 },
        { team1: 'Puskas Akademia', team2: 'Paks', tip: '1', odd: 1.68 },
        { team1: 'Helmond Sport', team2: 'Jong Ajax', tip: '-2.5', odd: 2.55 }
      ],
      form: '23/10',
      success: 75,
      avgOdd: 1.78,
      price1Week: 119.00,
      price2Weeks: 179.00
    }
  ];

  ngOnInit(): void {
    this.dialogConfig = new MatDialogConfig();
    this.checkAuth()
  }

  openDialog(name:string,price:string,id:string){

    this.sharedService.currentAuthStatus.subscribe((res)=>{
      console.log(res)
      if (res[0]=='authenticated') {
       const dialogRef = this.dialog.open(TipsterPaywallComponent, {
       width: '440px',
       data: {
        message: name,  // category
        email: res[1],  // email
        category:price,  //rate card
        id :id
      }
        });
  
        } else {
      window.alert('Please Log in to continue')
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

  checkSubscription(){
    this.sharedService.userArray.subscribe((res)=>{
      this.subscriptionOne = res[0].tipster1.split('+')[0]
      this.subscriptionTwo = res[0].tipster2.split('+')[0] || ''

      console.log(this.subscriptionOne)
      if (this.subscriptionOne == "Yes"){
        console.log('subscribed')
           this.tipsterOne = true
      }
      if (this.subscriptionTwo == "Yes"){
        this.tipsterTwo = true
   }
    })
  }
  
}
