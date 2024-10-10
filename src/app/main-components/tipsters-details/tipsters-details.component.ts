import { Component } from '@angular/core';

@Component({
  selector: 'app-tipsters-details',
  templateUrl: './tipsters-details.component.html',
  styleUrl: './tipsters-details.component.css'
})
export class TipstersDetailsComponent {

  matchDays = [
    {
      date: new Date('2024-10-04'),
      matches: [
        { team1: 'Jong AZ Alkmaar', team2: 'FC Eindhoven', tip: '-2.5', odds: 2.20, tipWin: true },
        { team1: 'Jong Utrecht', team2: 'Telstar', tip: 'BTS', odds: 1.65, tipWin: true },
        { team1: 'Helmond Sport', team2: 'Jong Ajax', tip: 'BTS', odds: 1.75, tipWin: false },
        { team1: 'Dordrecht', team2: 'Jong PSV', tip: '+2.5', odds: 1.35, tipWin: true },
        { team1: 'Vitesse', team2: 'Volendam', tip: '-2.5', odds: 2.40, tipWin: false }
      ]
    },
    {
      date: new Date('2024-10-03'),
      matches: [
        { team1: 'Slavia Prague', team2: 'Ajax', tip: 'BTS', odds: 1.90, tipWin: true },
        { team1: 'Omonia Nicosia', team2: 'Vikingur Reykjavik', tip: '+2.5', odds: 1.69, tipWin: true },
        { team1: 'Hoffenheim', team2: 'Dynamo Kiev', tip: '-2.5', odds: 2.29, tipWin: false },
        { team1: 'Shamrock Rovers', team2: 'APOEL Nicosia', tip: 'BTS', odds: 1.90, tipWin: true },
        { team1: 'Union Saint-Gilloise', team2: 'Bodo/Glimt', tip: '-2.5', odds: 2.22, tipWin: false }
      ]
    }
  ];
}
