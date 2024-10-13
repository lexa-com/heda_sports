import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesService } from '../../../Services/games.service';
import { AdminNotifComponent } from '../../admin-notif/admin-notif.component';

@Component({
  selector: 'app-tipster-game-update',
  templateUrl: './tipster-game-update.component.html',
  styleUrls: ['./tipster-game-update.component.css']
})
export class TipsterGameUpdateComponent {
  gameData: any;
  category: string;
  formData: FormGroup;
  date: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private gamesService: GamesService,
    private dialog: MatDialog
  ) {
    // Get the navigation extras (queryParams) for category and gameData
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.queryParams) {
      this.gameData = navigation.extras.queryParams['gameData'];
      this.category = navigation.extras.queryParams['category'];
      this.date = navigation.extras.queryParams['date'];
    } else {
      this.snackBar.open('No game data found in query params.', '', { duration: 3000 });
      this.gameData = null;
      this.category = '';
    }

    // Initialize the form group with default or passed game data
    this.formData = this.formBuilder.group({
      date: [this.gameData ? this.gameData.date : ''],
      ko: [this.gameData ? this.gameData.ko : ''],
      games: [this.gameData ? this.gameData.games : ''],
      league: [this.gameData ? this.gameData.league : ''],
      predict: [this.gameData ? this.gameData.predict : ''],
      odds: [this.gameData ? this.gameData.odds : ''],
      category: [this.gameData ? this.category : ''],
      result: [this.gameData ? this.gameData.result : ''],
      verdict: [this.gameData ? this.gameData.verdict : '']
    });
  }

  onSubmit() {
    this.updateGame(); // Call the update method when form is submitted
  }

  updateGame() {
    const gameDate = this.date; // Extract the game date from form data
    const gameId = this.gameData.id; // Assuming the game ID is available in this.gameData
    const category = this.category;
  
    // Get updated data from form controls
    const updatedGameData = {
      games: this.formData.value.games,
      result: this.formData.value.result,
      verdict: this.formData.value.verdict,
      predict: this.formData.value.predict,
      ko: this.formData.value.ko,
      league: this.formData.value.league,
      odds: this.formData.value.odds,
      
    };
  
    // Call the service to update the game in Firestore
    this.gamesService.updateGameInArrayById(category, gameDate, gameId, updatedGameData)
      .then(() => {
        this.snackBar.open('Game updated successfully!', '', { duration: 3000 });
      })
      .catch((error) => {
        console.error('Error updating game:', error);
        this.snackBar.open('Error updating game.', '', { duration: 3000 });
      });
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
          this.deleteGame(this.gameData.id)
        }
          
        });
  
     
  }

  deleteGame(gameId: string): void {
    this.gamesService.deleteGameFromArrayById(this.category, this.date, gameId)
      .then(() => {
        this.snackBar.open('Game deleted successfully!', '', { duration: 3000 });
        //this.getAllGames(); // Refresh the game list
      })
      .catch((error) => {
        console.error('Error deleting game:', error);
        this.snackBar.open('Error deleting game', '', { duration: 3000 });
      });
}

}
