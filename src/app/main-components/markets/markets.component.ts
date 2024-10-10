import { Component } from '@angular/core';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.css'
})
export class MarketsComponent {


  bettingMarkets = [
    {
      name: 'Over 1.5 Goals',
      description: 'You are betting that the total number of goals in the match will be more than 1.5, meaning at least 2 goals must be scored for your bet to win.'
    },
    {
      name: 'Under 1.5 Goals',
      description: 'You are betting that the total number of goals in the match will be less than 1.5. Your bet wins if 0 or 1 goal is scored in the game.'
    },
    {
      name: 'Handicap Betting',
      description: 'In handicap betting, one team is given a virtual advantage or disadvantage. For example, in a -1.5 handicap, the team must win by 2 or more goals for the bet to win.'
    },
    {
      name: 'Asian Handicap -1.5',
      description: 'If you bet on a team with an Asian Handicap of -1.5, they must win by 2 or more goals for your bet to win. A 1-goal win means your bet loses.'
    },
    {
      name: 'Match Result (1X2)',
      description: 'You are betting on the outcome of the match: 1 for home win, X for draw, and 2 for away win.'
    },
    {
      name: 'Double Chance',
      description: 'Double chance allows you to cover two out of three outcomes in a match. For example, betting on 1X means either the home team wins or the game ends in a draw.'
    },
    {
      name: 'Both Teams to Score (BTTS)',
      description: 'In this market, you bet on whether both teams will score at least one goal. You can bet on "Yes" (both teams score) or "No" (at least one team does not score).'
    },
    {
      name: 'Correct Score',
      description: 'You are predicting the exact score of the match. This market usually has higher odds because of the difficulty in predicting the precise result.'
    },
    {
      name: 'Draw No Bet',
      description: 'This is a safer bet where you are betting on a team to win, and if the match ends in a draw, your stake is returned.'
    },
    {
      name: 'Accumulator (Parlay) Bets',
      description: 'An accumulator combines multiple bets into one. All selections must win for the bet to pay out, but the returns are much higher than single bets.'
    },
    {
      name: 'First Goalscorer',
      description: 'In this market, you bet on which player will score the first goal in a match. If the selected player scores first, your bet wins.'
    },
    {
      name: 'Last Goalscorer',
      description: 'Similar to first goalscorer, but here you are betting on which player will score the final goal of the match.'
    },
    {
      name: 'Total Goals',
      description: 'You are betting on the exact number of goals that will be scored in the match. This differs from Over/Under betting because you are predicting an exact number.'
    }
  ];
}

