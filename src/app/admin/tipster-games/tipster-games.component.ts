import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipster-games',
  templateUrl: './tipster-games.component.html',
  styleUrl: './tipster-games.component.css'
})
export class TipsterGamesComponent implements OnInit{

 
  fixtures: any = [];
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



  ngOnInit(): void {
    this.getTip1()
  }

  getTip1(){
    this.gamesService.getAllGamesFromDB(this.category).subscribe(data => {
      console.log(data)
      this.fixtures = data.reduce((acc, doc) => {
        if (doc.games && Array.isArray(doc.games)) {
          return acc.concat(doc.games); // Merge all 'games' arrays from each document
        }
        return acc;
      }, []);
    });
  }



  onCategorySubmit() {
    if (this.formCategory.valid) {
      const categoryValues = this.formCategory.value;
      this.title = categoryValues.date
      this.gameDate = categoryValues.date
      this.category = categoryValues.category
      console.log('Category and Date submitted:', categoryValues);
      this.getTip1()
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

  editGame(game:any) {
    this.router.navigate(['tipster/game'],{ queryParams: {date:this.gameDate ,category:this.category,gameData:game} });
    }
  }


