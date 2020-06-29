import { Injectable } from '@angular/core';
import Arweave from 'arweave/web';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';
import { PasswordsModule } from '../passwords/passwords.module';
import { promises } from 'dns';

const  arweave = Arweave.init({});

@Injectable({
  providedIn: 'root'
})
export class ArweaveService {
 
  currentWallet:any;
  currentAddress:string;
  
  constructor(private _authService: AuthService, private _globals: GlobalsService) { 
    let wallet = _authService.currentWallet.subscribe(wallet=>{
    
      
      if(wallet.kty!=null){
        arweave.wallets.jwkToAddress(wallet).then(a=> {
          this.currentAddress = a;
          this.currentWallet = wallet;
        })
      }
    });
  }

  async add(data:any):Promise<string>{
    
    let transaction = await arweave.createTransaction({
      data: JSON.stringify(data)
    }, this.currentWallet);

    transaction.addTag(this._globals.AppNameKey,this._globals.AppNameValue);
    
    await arweave.transactions.sign(transaction, this.currentWallet);

    const response = await arweave.transactions.post(transaction);
  
    return transaction.id;
    

  }

  getAll(){
    let txids = this.GetTxids();
    return txids;
  }

  private async GetTxids():Promise<any[]>{
    const query = {
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'from',
        expr2: this.currentAddress
      },
      expr2: {
        op: 'equals',
        expr1: this._globals.AppNameKey,
        expr2: this._globals.AppNameValue
      }
    };
    const res = await arweave.arql(query);
    return res;
  }

  getPasswordContent(txid:string): Promise<string|Uint8Array>{
    return arweave.transactions.getData(txid, {decode: true,string: true});
  }
}
