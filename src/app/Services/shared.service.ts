import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private arraySource = new BehaviorSubject<any[]>([]);
  currentArray = this.arraySource.asObservable();

  private itemSource = new BehaviorSubject<any[]>([]);
  currentAuthStatus = this.itemSource.asObservable();

  private arrayUser = new BehaviorSubject<any[]>([]);
  userArray = this.arrayUser.asObservable();

  changeArray(newArray: any[]) {
    this.arraySource.next(newArray);
  }

  authCheck(newItem: any[]) {
    this.itemSource.next(newItem);
    console.log(newItem)
  }

  changeUserArray(newArray: any[]) {
    this.arrayUser.next(newArray);
  }
}

