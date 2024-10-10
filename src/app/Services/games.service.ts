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


}