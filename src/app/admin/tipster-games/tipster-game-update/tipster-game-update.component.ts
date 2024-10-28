import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesService } from '../../../Services/games.service';
import { AdminNotifComponent } from '../../admin-notif/admin-notif.component';

@Component({
  selector: 'app-tipster-game-update',
  templateUrl: './tipster-game-update.component.html',
  styleUrls: ['./tipster-game-update.component.css']
})
export class TipsterGameUpdateComponent implements OnInit {
  gameData: any;
  category: any;
  formData: FormGroup;
  date: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private gamesService: GamesService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TipsterGameUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: any,
  ) {

    this.gameData = Data.match
    this.category = Data.tipster
  
    // Initialize the form group with default or passed game data
    this.formData = this.formBuilder.group({
      date: [this.gameData ? this.gameData.date : ''],
      ko: [this.gameData ? this.gameData.ko : ''],
      games: [this.gameData ? this.gameData.games : ''],
      league: [this.gameData ? this.gameData.league : ''],
      predict: [this.gameData ? this.gameData.predict : ''],
      odds: [this.gameData ? this.gameData.odds : ''],
      category: [this.gameData ? this.gameData.category : ''],
      result: [this.gameData ? this.gameData.result : ''],
      verdict: [this.gameData ? this.gameData.verdict : '']
    });
    
  }
  ngOnInit(): void {
   
  }

  onSubmit() {
    this.updateGame(); // Call the update method when form is submitted
  }
  

  updateGame() {
    const gameId = this.gameData.id; // Assuming the game ID is available in this.gameData
    const updatedGameData = {
      games: this.formData.value.games,
      result: this.formData.value.result,
      verdict: this.formData.value.verdict,
      predict: this.formData.value.predict,
      ko: this.formData.value.ko,
      league: this.formData.value.league,
      odds: this.formData.value.odds,
      category: this.formData.value.category,
      
    };
  
    this.gamesService.updateGameInArrayById(gameId, updatedGameData)
      .then(() => {
        this.snackBar.open('Game updated successfully!', '', { duration: 3000 });
        this.dialogRef.close({ event: 'close', data: "modify" })
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
    this.gamesService.deleteGameFromArrayById(gameId)
      .then(() => {
        this.snackBar.open('Game deleted successfully!', '', { duration: 3000 });
        this.dialogRef.close({ event: 'close', data: "delete" })
      })
      .catch((error) => {
        console.error('Error deleting game:', error);
        this.snackBar.open('Error deleting game', '', { duration: 3000 });
      });
}

}
