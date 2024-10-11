import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesService } from '../../../Services/games.service';

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

  
  constructor(private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private gamesService: GamesService
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
    },
    error => {
      console.error('Error posting game:', error);
    }
  );
}
}
