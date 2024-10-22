import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VvipService {

  //https://europe-west1.gcp.data.mongodb-api.com/app/application-0-alaar/endpoint/vip/add/games
  //https://europe-west1.gcp.data.mongodb-api.com/app/application-0-alaar/endpoint/vip/get/games
  //https://europe-west1.gcp.data.mongodb-api.com/app/application-0-alaar/endpoint/vip/modify
  //https://europe-west1.gcp.data.mongodb-api.com/app/application-0-alaar/endpoint/vip/delete/game /add/message

  private Url: string = environment.gamesApi;

  constructor(private http: HttpClient) { }
 
  getGames(): Observable<any> {
    return this.http
      .get<any>(`${this.Url}vip/get/games`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching VIP  games', error);
          return throwError('Error fetching ATM reversals');
        })
      );
  }

  postGame(gameData: any): Observable<any> {
        
    return this.http
      .post<any>(`${this.Url}vip/add/games`, gameData)
      .pipe(
        catchError((error: any) => {
          console.error('Error posting game data:', error);
          return throwError('Error posting gae data');
        })
      );
  }
  sendMessage(message: any): Observable<any> {
        
    return this.http
      .post<any>(`${this.Url}add/message`, message)
      .pipe(
        catchError((error: any) => {
          console.error('Error posting message data:', error);
          return throwError('Error posting gae data');
        })
      );
  }
  getMessage(): Observable<any> {
    return this.http
      .get<any>(`${this.Url}get/message`)
      .pipe(
        catchError((error: any) => {
          console.error('Error getting messages', error);
          return throwError('Error fetching ATM reversals');
        })
      );
  }

  updateGame(gameId: string, updatedGameData: any): Observable<any> {
    return this.http
      .put<any>(`${this.Url}vip/modify?id=${gameId}`, updatedGameData)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating game:', error);
          return throwError('Error updating game');
        })
      );
  }
  
  deleteGame(gameId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.Url}vip/delete/game?id=${gameId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting game:', error);
          return throwError('Error deleting game');
        })
      );
  }
}
