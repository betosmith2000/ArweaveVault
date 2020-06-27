import { Injectable } from '@angular/core';
import {UserWallet } from '../models/wallet/user-wallet.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentWalletSubject: BehaviorSubject<UserWallet>;
  public currentWallet: Observable<UserWallet>;
  private _currentWallet:any;

  constructor() {
    this.currentWalletSubject = new BehaviorSubject<UserWallet>(new UserWallet());
    this.currentWallet = this.currentWalletSubject.asObservable();
    
  }

  public get GetUserWallet(): UserWallet {
    return this.currentWalletSubject.value;
  }

  login(wallet:string) {
    this._currentWallet = JSON.parse(wallet);
    this.currentWalletSubject.next(this._currentWallet);
    return this.currentWallet;
  }

}
  
