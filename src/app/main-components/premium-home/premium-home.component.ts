import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-premium-home',
  templateUrl: './premium-home.component.html',
  styleUrl: './premium-home.component.css'
})
export class PremiumHomeComponent implements OnInit {

  displayUI:boolean = false

  constructor(private router:Router,
    private shared: SharedService
  ){

  }
  ngOnInit(): void {
   this.checkAuth()
  }

  checkAuth(){
    this.shared.currentAuthStatus.subscribe((res)=>{
      if (res[0] == 'authenticated'){
        this.displayUI = true
      }

    })
  }

  bettingMarkets = [
    {
      name: '👑 5+ Odds Combo Tips',
      description: 'five'
    },
    {
      name: '👑 10+ Odds Combo Tips',
      description: 'ten'
    },
    {
      name: '👑 20+ Odds Combo Tips',
      description: 'twenty'
    },
    {
      name: '👑 VVIP Combo Tips',
      description: 'vvip'
    },
  ]

  openNavigation(cat:string){

    if (cat == 'five'){
    this.router.navigate(['/premium/five'])
    }
    if (cat == 'ten'){
      this.router.navigate(['/premium/ten'])
      }
    if (cat == 'twenty'){
        this.router.navigate(['/premium/twenty'])
        }
    if (cat == 'vvip'){
          this.router.navigate(['/premium/vvip'])
          }
         

  }

}
