import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesService } from '../../../Services/games.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminNotifComponent } from '../../admin-notif/admin-notif.component';
import { VvipService } from '../../../Services/vip.service/vvip.service';

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
  categorySelect: boolean = true;
  hideTable:boolean = true;
  title: any;
  formCategory: FormGroup;
  dialogConfig: MatDialogConfig<any> | undefined;
  gamesArray: any[] = [];

  
  constructor(private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private gamesService: GamesService,
    private vvipService: VvipService,
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

    this.formCategory = this.fb.group({ // Initialize the new form
      category: [''],
      date: ['']
    });
   
  }

  removeGame(index: number) {
    this.gamesArray.splice(index, 1); // Remove the item from the array
    console.log('Game removed:', this.gamesArray); // Log the updated array
  }
  
  ngOnInit(): void {
    console.log(this.category)
    if (this.category == "update"){
      this.fillForm()
      this.modifyGame = true
      this.hideTable = false
      this.title = "Updating Game"
    }
    if (this.category == "add"){
      this.emptyForm()
      this.addGame = true
      this.title = "Adding a new Game"
    }
  }

  onSubmit() {
    if (this.formData.valid) {
      const formValues = this.formData.value;
      this.gamesArray.push(formValues);
      this.snackBar.open('Game data added to array!', 'Close', {
        duration: 3000
      });
      this.formData.reset();
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000
      });
    }
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
    date: ['', Validators.required],
    ko: ['',Validators.required],
    games: ['',Validators.required],
    league: ['',Validators.required],
    predict: ['',Validators.required],
    odds: ['',Validators.required],
    category: ['',Validators.required],
    result: ['',Validators.required],
    verdict: ['',Validators.required],
    
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

if (this.gamesArray.length == 0){
  this.snackBar.open('Please add the game:', '', { duration: 3000 });
}
else{
if (this.category == 'free'){
  this.gamesService.postGame(this.gamesArray).subscribe(
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
if (this.category =='vvip'){

  this.vvipService.postGame(this.gamesArray).subscribe(
    response => {
      console.log('Vip Game posted successfully:', response);
      this.snackBar.open('Game posted successfully:', '', { duration: 3000 });
    },
    error => {
      console.error('Error posting game:', error);
      this.snackBar.open('Error posting game:', '', { duration: 3000 });
    }
  );

}

}

  
}

updateGame() {

  if (this.gameData.category == '11' ||this.gameData.category == '12'||this.gameData.category == '13'||
    this.gameData.category == '14'
   ){
    console.log("vvvip")

    this.vvipService.updateGame(this.gameData._id,this.formData.value).subscribe(
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
   } else {

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
}

deleteGame() {

  if (this.gameData.category == '11' ||this.gameData.category == '12'||this.gameData.category == '13'||
    this.gameData.category == '14'
   ){

    this.vvipService.deleteGame(this.gameData._id).subscribe(
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

  } else {

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

onCategorySubmit() {
  if (this.formCategory.valid) {
    const categoryValues = this.formCategory.value;
    this.title = categoryValues.date
       this.category = categoryValues.category
       this.categorySelect = false
     this.snackBar.open('Category and Date submitted!', 'Close', {
      duration: 3000
    });
    this.formCategory.reset(); // Reset the category form after submission
  } else {
    this.snackBar.open('Please fill out all required fields in the category form.', 'Close', {
      duration: 3000
    });
  }
}

}
