import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private Url: string = environment.gamesApi;

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http
      .get<any>(`${this.Url}get/games`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching ATM reversals:', error);
          return throwError('Error fetching ATM reversals');
        })
      );
  }

  postGame(gameData: any): Observable<any> {
        
    return this.http
      .post<any>(`${this.Url}add/games`, gameData)
      .pipe(
        catchError((error: any) => {
          console.error('Error posting game data:', error);
          return throwError('Error posting game data');
        })
      );
  }

  updateGame(gameId: string, updatedGameData: any): Observable<any> {
    return this.http
      .put<any>(`${this.Url}modify?id=${gameId}`, updatedGameData)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating game:', error);
          return throwError('Error updating game');
        })
      );
  }
  
  deleteGame(gameId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.Url}delete/game?id=${gameId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting game:', error);
          return throwError('Error deleting game');
        })
      );
  }
  

}