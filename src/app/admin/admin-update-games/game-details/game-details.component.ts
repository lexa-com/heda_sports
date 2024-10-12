import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesService } from '../../../Services/games.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminNotifComponent } from '../../admin-notif/admin-notif.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent implements OnInit {
  gameData: any;
  category: any;
  addGame: boolean = false;
  modifyGame: boolean = false;
  title: any;
  dialogConfig: MatDialogConfig<any> | undefined;

  
  constructor(private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private gamesService: GamesService,
    private dialog: MatDialog,
  ) { const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.queryParams) {
      this.gameData = navigation.extras.queryParams['gameData'];
      this.category = navigation.extras.queryParams['category'];
    } else {
      this.snackBar.open('No user data found in query params.', '', { duration: 3000 });
      this.gameData = null;
      this.category = null;
    } 
   
  }
  
  ngOnInit(): void {
    console.log(this.category)
    if (this.category == "update"){
      this.fillForm()
      this.modifyGame = true
      this.title = "Updating Game"
    }
    if (this.category == "add"){
      this.emptyForm()
      this.addGame = true
      this.title = "Adding a new Game"
    }
  }

  onSubmit() {
    this.fillForm()
  }

fillForm(){

    this.formData = this.fb.group({
    date: this.gameData.date,
    ko: this.gameData.ko,
    games: this.gameData.games,
    league: this.gameData.league,
    predict: this.gameData.predict,
    odds: this.gameData.odds,
    category: this.gameData.category,
    result: this.gameData.result,
    verdict:this.gameData.verdict,
    
    
  });

}

emptyForm(){

  this.formData = this.fb.group({
    date: [''],
    ko: [''],
    games: [''],
    league: [''],
    predict: [''],
    odds: [''],
    category: [''],
    result: [''],
    verdict: [''],
    
  });
}

formData: FormGroup = this.fb.group({
  date: [''],
  ko: [''],
  games: [''],
  league: [''],
  predict: [''],
  odds: [''],
  category: [''],
  result: [''],
  verdict: [''],
  
});

submitGame() {
  this.gamesService.postGame([this.formData.value]).subscribe(
    response => {
      console.log('Game posted successfully:', response);
      this.snackBar.open('Game posted successfully:', '', { duration: 3000 });
    },
    error => {
      console.error('Error posting game:', error);
      this.snackBar.open('Error posting game:', '', { duration: 3000 });
    }
  );
}

updateGame() {
  this.gamesService.updateGame(this.gameData._id,this.formData.value).subscribe(
    response => {
      console.log('Game updated successfully:', response);
      this.snackBar.open('Game updated successfully:', '', { duration: 3000 });
      this.router.navigate(['update/games'])
    },
    error => {
      console.error('Error updating game:', error);
      this.snackBar.open('Error updating game:', '', { duration: 3000 });
    }
  );
}

deleteGame() {
  this.gamesService.deleteGame(this.gameData._id).subscribe(
    response => {
      console.log('Game deleted successfully:', response);
      this.snackBar.open('Game deleted successfully:', '', { duration: 3000 });
      this.router.navigate(['update/games'])
    },
    error => {
      console.error('Error deleting game:', error);
      this.snackBar.open('Error deleting game:', '', { duration: 3000 });
    }
  );
}

openDialog() {
  const message = "Are you sure You want to delete?..."
 
      const dialogRef = this.dialog.open(AdminNotifComponent, {
        width: '440px',
        data: message
      });

      // Handle dialog close and trigger actions
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result)
      if (result.data == "No"){

      }else if (result.data == "Yes"){
        this.deleteGame()
      }
        
      });

   
}

}
