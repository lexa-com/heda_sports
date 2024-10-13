import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { arrayUnion } from 'firebase/firestore';
import { firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app'
import { v4 as uuidv4 } from 'uuid';

interface Game {
  id: string;
  games: string;
  ko: string;
  league: string;
  odds: string;
  predict: string;
  result: string;
  verdict: string;
}

interface DocumentData {
  games: Game[];  // Array of games
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private Url: string = environment.gamesApi;

  constructor(private http: HttpClient,private firestore: AngularFirestore) { }
 
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


pushGamesToDB(category: string, gameDate: string, gamesArray: any[]): Promise<void> {
  const docRef = this.firestore.collection(category).doc(gameDate);

  // Add unique IDs to each game
  const gamesWithIds = gamesArray.map(game => ({
    id: uuidv4(),  // Generate a unique ID for each game
    ...game
  }));

  // Use Firestore arrayUnion to add games without overwriting the existing array
  return docRef.update({
    games: firebase.firestore.FieldValue.arrayUnion(...gamesWithIds)
  }).catch((error) => {
    // If the document doesn't exist yet, create it with the games array
    return docRef.set({
      games: gamesWithIds
    });
  });
}

  getAllGamesFromDB(category:any): Observable<any[]> {
    //const category = 'tipster1';  // Hardcoded category
    return this.firestore.collection(category).snapshotChanges().pipe(
      map((actions: any[]) => actions.map((a: { payload: { doc: { data: () => any; id: any; }; }; }) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };  // Include document ID if needed
      }))
    );
  }
    
  
  async updateGameInArrayById(category: string, gameDate: string, gameId: string, updatedGameData: Partial<Game>): Promise<void> {
    const docRef = this.firestore.collection(category).doc(gameDate);
  
    try {
      // Retrieve the document (now typed as DocumentData)
      const docSnapshot = await firstValueFrom(docRef.get());
  
      if (docSnapshot.exists) {
        const docData = docSnapshot.data() as DocumentData;  // Typecast to DocumentData
        const gamesArray = docData.games || [];
  
        // Find the game to update using its unique 'id' field
        const gameIndex = gamesArray.findIndex((game: Game) => game.id === gameId);
  
        if (gameIndex !== -1) {
          // Modify the specific game, including changing the 'games' field if necessary
          gamesArray[gameIndex] = { ...gamesArray[gameIndex], ...updatedGameData };
  
          // Update the document with the modified games array
          await docRef.update({
            games: gamesArray
          });
          console.log('Game successfully updated!');
        } else {
          console.error('Game not found in the array');
        }
      } else {
        console.error('Document does not exist');
      }
    } catch (error) {
      console.error('Error updating game in Firestore: ', error);
    }
  }

  deleteGameFromArrayById(category: string, gameDate: string, gameId: string): Promise<void> {
    const docRef = this.firestore.collection(category).doc(gameDate);
  
    // Step 1: Retrieve the current array of games
    return docRef.get().toPromise().then((docSnapshot) => {
      // Step 2: Check if the document snapshot is defined
      if (!docSnapshot || !docSnapshot.exists) {
        throw new Error('Document does not exist'); // Handle non-existent document
      }
  
      const data = docSnapshot.data() as DocumentData; // Type assertion
      const gamesArray = data ? data.games : []; // Safely access games

      // Step 3: Filter out the game to be deleted
      const updatedGamesArray = gamesArray.filter((game: Game) => game.id !== gameId);
  
      // Step 4: Update Firestore with the new games array
      return docRef.update({
        games: updatedGamesArray
      });
    }).catch((error) => {
      console.error('Error deleting game:', error);
      throw error; // Re-throw to handle it later in the component
    });
}

getAllMatchDays(category: string): Observable<any[]> {
  return this.firestore.collection(category).snapshotChanges().pipe(
    map((actions: any[]) => actions.map((a: { payload: { doc: { data: () => any; id: string }; }; }) => {
      const data = a.payload.doc.data(); // Get the document data (games)
      const date = a.payload.doc.id; // Document ID (date)
      
      // Map Firestore data to the desired matchDays structure
      return {
        date: date,  // Convert document ID (string) to Date object
        matches: data.games    // Assuming 'games' is the field that holds an array of game objects
      };
    }))
  );
}


}

