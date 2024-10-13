import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';

@Component({
  selector: 'app-tipsters-details',
  templateUrl: './tipsters-details.component.html',
  styleUrls: ['./tipsters-details.component.css']
})
export class TipstersDetailsComponent implements OnInit {

  matchDays: any[] = [];

  constructor(private gamesService: GamesService) {}

    ngOnInit(): void {
      const category = 'tipster2'; // Replace with your actual category
  
      this.gamesService.getAllMatchDays(category).subscribe((matchDays: any[]) => {
        // Get today's date for comparison
        const today = new Date();
        
        // Format today's date to dd-mm-yyyy
        const formattedToday = this.formatDateToDDMMYYYY(today);
        
        // Filter out matchDays where the date is today or in the future
        this.matchDays = matchDays
          .filter(day => day.date == formattedToday) // Remove today and beyond
          .reverse();  // Optionally reverse the array order
  
        console.log('Filtered matchDays:', this.matchDays);  // Check the structure
      });
    }
  
    // Helper method to format date to dd-mm-yyyy
    formatDateToDDMMYYYY(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based, so add 1) and pad
      const year = date.getFullYear(); // Get full year
  
      return `${day}-${month}-${year}`; // Return formatted string
    }
  }
