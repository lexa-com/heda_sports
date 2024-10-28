import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { arrayUnion } from 'firebase/firestore';
import { firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app'
import { v4 as uuidv4 } from 'uuid';
import { SharedService } from './shared.service';

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

  constructor(private http: HttpClient,private firestore: AngularFirestore,
    private sharedService:SharedService
  ) { }
 

  createGamesCollection(gamesArray: any[]): Promise<void> {
    const docRef = this.firestore.collection('games').doc('matches'); // Document name is the same as the collection
  
    // Add unique IDs to each game
    const gamesWithIds = gamesArray.map(game => ({
      id: uuidv4(),  // Generate a unique ID for each game
      ...game
    }));
  
    // Set the document with the games array
    return docRef.update({
      games: firebase.firestore.FieldValue.arrayUnion(...gamesWithIds)
    }).catch((error) => {
      // If the document doesn't exist yet, create it with the games array
      return docRef.set({
        games: gamesWithIds
      });
    });
  }
  
  async modifyGame(gameId: string, updatedGameData: Partial<Game>): Promise<void> {
    const docRef = this.firestore.collection('games').doc('matches'); // Points to the 'games' collection and 'matches' document
    
    try {
      // Retrieve the document snapshot
      const docSnapshot = await firstValueFrom(docRef.get());
  
      if (docSnapshot.exists) {
        // Extract the current games array from the document
        const docData = docSnapshot.data() as DocumentData;  // Typecast to DocumentData
        const gamesArray = docData.games || [];
  
        // Find the game with the matching 'id'
        const gameIndex = gamesArray.findIndex((game: Game) => game.id === gameId);
  
        if (gameIndex !== -1) {
          // Update the specific game's fields with the new data
          gamesArray[gameIndex] = { ...gamesArray[gameIndex], ...updatedGameData };
  
          // Update the Firestore document with the modified games array
          await docRef.update({
            games: gamesArray
          });
          this.getGames().subscribe((res)=>{
            this.sendMainGames(res)
            this.sendVipArray(res)
          })
          console.log('Game successfully updated!');
        } else {
          console.error('Game not found in the array');
        }
      } else {
        console.error('Document does not exist');
      }
    } catch (error) {
      console.error('Error updating game in Firestore: ', error);
      throw error;  // Re-throw the error if necessary
    }
  }
  
  async deleteGame(gameId: string): Promise<void> {
    const docRef = this.firestore.collection('games').doc('matches'); // Points to the 'games' collection and 'matches' document
  
    try {
      // Step 1: Retrieve the document snapshot
      const docSnapshot = await firstValueFrom(docRef.get());
  
      // Step 2: Check if the document exists
      if (!docSnapshot || !docSnapshot.exists) {
        throw new Error('Document does not exist');
      }
  
      const data = docSnapshot.data() as DocumentData; // Type assertion
      const gamesArray = data?.games || []; // Safely access the games array
  
      // Step 3: Filter out the game with the matching id
      const updatedGamesArray = gamesArray.filter((game: Game) => game.id !== gameId);
  
      // Step 4: Check if the game was found and removed
      if (gamesArray.length === updatedGamesArray.length) {
        throw new Error('Game not found');
      }
  
      // Step 5: Update the document with the new games array
      await docRef.update({
        games: updatedGamesArray
      });

      this.getGames().subscribe((res)=>{
        this.sendMainGames(res)
        this.sendVipArray(res)
      })
  
      console.log('Game successfully deleted!');
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;  // Re-throw to propagate the error
    }
  }
  getGames(): Observable<any[]> {
    const collectionName = 'games'; // Hardcoded collection name
    const docId = 'matches'; // Hardcoded document ID
    const docRef = this.firestore.collection(collectionName).doc(docId);
  
    return from(docRef.get()).pipe(
      map(docSnapshot => {
        // Check if the document exists
        if (!docSnapshot.exists) {
          throw new Error('Document does not exist');
        }
  
        // Extract the games array from the document data
        const data = docSnapshot.data() as DocumentData; // Type assertion
        const gamesArray = Array.isArray(data?.games) ? data.games : [];  // Ensure it's an array
  
        return gamesArray as Game[];  // Typecast to Game[] if needed
      }),
      catchError(error => {
        console.error('Error fetching games:', error);
        throw error;  // Re-throw the error for further handling
      })
    );
  }



  
pushGamesToDB(gamesArray: any[]): Promise<void> {
  const docRef = this.firestore.collection('Tipsters').doc('games');

  const gamesWithIds = gamesArray.map(game => ({
    id: uuidv4(),  // Generate a unique ID for each game
    ...game
  }));

  // Set the document with the games array
  return docRef.update({
    games: firebase.firestore.FieldValue.arrayUnion(...gamesWithIds)
  }).catch((error) => {
    // If the document doesn't exist yet, create it with the games array
    return docRef.set({
      games: gamesWithIds
    });
  });
}

getAllGamesFromDB(): Observable<any[]> {
  
    const collectionName = 'Tipsters'; // Hardcoded collection name
    const docId = 'games'; // Hardcoded document ID
    const docRef = this.firestore.collection(collectionName).doc(docId);
  
    return from(docRef.get()).pipe(
      map(docSnapshot => {
        // Check if the document exists
        if (!docSnapshot.exists) {
          throw new Error('Document does not exist');
        }
  
        // Extract the games array from the document data
        const data = docSnapshot.data() as DocumentData; // Type assertion
        const gamesArray = Array.isArray(data?.games) ? data.games : [];
        this.updateTipsterArray(gamesArray)
        return gamesArray as Game[]; 
      }),
      catchError(error => {
        console.error('Error fetching games:', error);
        throw error;  // Re-throw the error for further handling
      })
    );

  }

 updateTipsterArray(gamesArray:any) {
    this.sharedService.changeTip2Array(gamesArray);
  }

  sendMainGames(gamesArray:any) {
    this.sharedService.changeArray(gamesArray);
  }
  sendVipArray(gamesArray:any) {
    this.sharedService.changeVipArray(gamesArray);
  }
     
async updateGameInArrayById(gameId: string, updatedGameData: Partial<Game>): Promise<void> {
    const docRef = this.firestore.collection('Tipsters').doc('games'); // Points to the 'games' collection and 'matches' document
    
    try {
      // Retrieve the document snapshot
      const docSnapshot = await firstValueFrom(docRef.get());
  
      if (docSnapshot.exists) {
        // Extract the current games array from the document
        const docData = docSnapshot.data() as DocumentData;  // Typecast to DocumentData
        const gamesArray = docData.games || [];
  
        // Find the game with the matching 'id'
        const gameIndex = gamesArray.findIndex((game: Game) => game.id === gameId);
  
        if (gameIndex !== -1) {
          // Update the specific game's fields with the new data
          gamesArray[gameIndex] = { ...gamesArray[gameIndex], ...updatedGameData };
  
          // Update the Firestore document with the modified games array
          await docRef.update({
            games: gamesArray
          });
          console.log('Game successfully updated!');
          this.getAllGamesFromDB().subscribe((res)=>{
            this.updateTipsterArray(res)
          })
        } else {
          console.error('Game not found in the array');
        }
      } else {
        console.error('Document does not exist');
      }
    } catch (error) {
      console.error('Error updating game in Firestore: ', error);
      throw error;  // Re-throw the error if necessary
    }
  }

async deleteGameFromArrayById(gameId: string): Promise<void> {
    const docRef = this.firestore.collection('Tipsters').doc('games'); // Points to the 'games' collection and 'matches' document
  
    try {
      // Step 1: Retrieve the document snapshot
      const docSnapshot = await firstValueFrom(docRef.get());
  
      // Step 2: Check if the document exists
      if (!docSnapshot || !docSnapshot.exists) {
        throw new Error('Document does not exist');
      }
  
      const data = docSnapshot.data() as DocumentData; // Type assertion
      const gamesArray = data?.games || []; // Safely access the games array
  
      // Step 3: Filter out the game with the matching id
      const updatedGamesArray = gamesArray.filter((game: Game) => game.id !== gameId);
  
      // Step 4: Check if the game was found and removed
      if (gamesArray.length === updatedGamesArray.length) {
        throw new Error('Game not found');
      }
  
      // Step 5: Update the document with the new games array
      await docRef.update({
        games: updatedGamesArray
      });
  
      console.log('Game successfully deleted!');
      this.getAllGamesFromDB().subscribe((res)=>{
        this.updateTipsterArray(res)
      })
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;  // Re-throw to propagate the error
    }
}

}

