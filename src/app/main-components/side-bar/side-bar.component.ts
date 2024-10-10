import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{

  dialogConfig: MatDialogConfig<any> | undefined;

  constructor(private router: Router,
    private shared : SharedService,
    private dialog: MatDialog,
   ){


  }
  ngOnInit(): void {
    this.dialogConfig = new MatDialogConfig();
  }

  navigatePremiumFive(){
    this.checkAuthStatus()
  }

  checkAuthStatus(){
    const message = 'Kindly log in to view premium games'
    this.shared.currentAuthStatus.subscribe((res)=>{
    if (res[0] == 'authenticated'){
    this.router.navigate(['/premium/five'])
  } else{
    this.openDialog(message)
  }
  
})

  }

  openDialog(message:string){
    
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '440px',
      data:message
  
    });
  }

}
