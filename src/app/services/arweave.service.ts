import { Injectable } from '@angular/core';
import Arweave from 'arweave/web';
import { AuthService } from './auth.service';


const  arweave = Arweave.init({});

@Injectable({
  providedIn: 'root'
})
export class ArweaveService {
 
  currentWallet:any;
  constructor(private _authService: AuthService) { 
    arweave.network.getInfo().then(console.log);
    let wallet = _authService.currentWallet.subscribe(e=>{
      this.currentWallet = e;

    });
    
    
  }


}
