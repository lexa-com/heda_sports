import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent implements OnInit {
  authenticated: any = false;
  notAuthenticated: any = true;
  
    constructor(private auth : AuthService,
      private shared : SharedService,
      private router : Router
    ){
  
    }
    ngOnInit(): void {
      this.checkAuth()
    }
  
    checkAuth(){
   this.shared.currentAuthStatus.subscribe((res)=>{
    console.log(res)
    if (res[0] == null){
      this.authenticated = false
      this.notAuthenticated = true
  
    } else if (res[0] == 'authenticated'){
      this.authenticated = true
      this.notAuthenticated = false
  
    } else if (res[0] == 'null'){
      this.authenticated = false
      this.notAuthenticated = true
    }
  })
  
    }
  
  
    logOut(){
  this.auth.logOut()
  this.shared.authCheck(['null','null'])
  
    }
  
  }
  