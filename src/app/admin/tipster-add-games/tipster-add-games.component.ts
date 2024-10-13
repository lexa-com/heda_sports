import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesService } from '../../Services/games.service';

@Component({
  selector: 'app-tipster-add-games',
  templateUrl: './tipster-add-games.component.html',
  styleUrl: './tipster-add-games.component.css'
})
export class TipsterAddGamesComponent {

  gamesArray: any[] = [];
  formCategory: FormGroup;
  title: any;
  gameDate: any;
  category: any;

  constructor(private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private gamesService: GamesService,
    private dialog: MatDialog,
  ){this.formCategory = this.fb.group({ // Initialize the new form
    category: [''],
    date: ['']
  });}

 
  formData: FormGroup = this.fb.group({
    ko: [''],
    games: [''],
    league: [''],
    predict: [''],
    odds: [''],
    result: [''],
    verdict: [''],
    
  });

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

  removeGame(index: number) {
    this.gamesArray.splice(index, 1); // Remove the item from the array
    console.log('Game removed:', this.gamesArray); // Log the updated array
  }

  pushToDB() {
    if (this.gamesArray.length > 0) {
      this.gamesService.pushGamesToDB(this.category, this.gameDate, this.gamesArray)
        .then(() => {
          this.snackBar.open('Games successfully pushed to Firestore!', 'Close', {
            duration: 3000
          });
          this.gamesArray = []; // Clear the array after successful push
          this.formData.reset(); // Reset the form
        })
        .catch((error) => {
          console.error('Error pushing games to Firestore: ', error);
          this.snackBar.open('Failed to push games to Firestore. Please try again.', 'Close', {
            duration: 3000
          });
        });
    } else {
      this.snackBar.open('Please enter a valid date and add games to the list.', 'Close', {
        duration: 3000
      });
    }
  }
  
  onCategorySubmit() {
    if (this.formCategory.valid) {
      const categoryValues = this.formCategory.value;
      this.title = categoryValues.date
      this.gameDate = categoryValues.date
      this.category = categoryValues.category
      console.log('Category and Date submitted:', categoryValues);
      // You may want to handle the category and date submission logic here
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
