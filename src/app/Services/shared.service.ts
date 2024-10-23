import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private arraySource = new BehaviorSubject<any[]>([]);
  currentArray = this.arraySource.asObservable();

  private arrayVip = new BehaviorSubject<any[]>([]);
  vipArray = this.arrayVip.asObservable();

  private arrayTipster1 = new BehaviorSubject<any[]>([]);
  tipster1Array = this.arrayTipster1.asObservable();

  private arrayTipster2 = new BehaviorSubject<any[]>([]);
  tipster2Array = this.arrayTipster2.asObservable();

  private itemSource = new BehaviorSubject<any[]>([]);
  currentAuthStatus = this.itemSource.asObservable();

  private arrayUser = new BehaviorSubject<any[]>([]);
  userArray = this.arrayUser.asObservable();

  changeArray(newArray: any[]) {
    this.arraySource.next(newArray);
  }

  changeVipArray(newArray: any[]) {
    this.arrayVip.next(newArray);
  }

  changeTip1Array(newArray: any[]) {
    this.arrayTipster1.next(newArray);
  }
  changeTip2Array(newArray: any[]) {
    this.arrayTipster2.next(newArray);
  }

  authCheck(newItem: any[]) {
    this.itemSource.next(newItem);
    
  }

  changeUserArray(newArray: any[]) {
    this.arrayUser.next(newArray);
  }
}

