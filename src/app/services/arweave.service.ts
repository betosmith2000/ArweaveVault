import { Injectable } from '@angular/core';
import Arweave from 'arweave/web';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';
import { ArQLModel } from '../models/arql/arql.model';


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

  async add(data:any, dataType:string, fileName:string):Promise<string>{
    
    let transaction = await arweave.createTransaction({
      data: JSON.stringify(data)
    }, this.currentWallet);

    transaction.addTag(this._globals.AppNameKey,this._globals.AppNameValue);
    transaction.addTag(this._globals.DataTypeKey,dataType);
    if(fileName)
      transaction.addTag(this._globals.FileNameKey,fileName);
    
    await arweave.transactions.sign(transaction, this.currentWallet);

    const response = await arweave.transactions.post(transaction);
  
    return transaction.id;
    

  }

  getAll(dataType:string){
    let txids = this.GetTxids(dataType);
    return txids;
  }

  private async GetTxids(dataType:string):Promise<any[]>{

     let mainQuery = new ArQLModel();
     
    let ownerQuery: ArQLModel={ 
      op: 'equals',
      expr1: 'from',
      expr2: this.currentAddress
    };

    let appQuery: ArQLModel={
      op: 'equals',
      expr1: this._globals.AppNameKey,
      expr2: this._globals.AppNameValue
    }

    if(dataType==this._globals.AnyDataTypeValue)
    {
      mainQuery={
        op:'and',
        expr1:ownerQuery,
        expr2:appQuery
      }
    }
    else{
      let dataTypeQuery:ArQLModel={
        op: 'equals',
        expr1: this._globals.DataTypeKey,
        expr2: dataType
      };

      let appAndDataTypeQuery :ArQLModel={
        op :'and',
        expr1: appQuery,
        expr2: dataTypeQuery
      }

      mainQuery={
        op:'and',
        expr1:ownerQuery,
        expr2:appAndDataTypeQuery
      }
    }

    const res = await arweave.arql(mainQuery);
    return res;
  }

  getTXContent(txid:string): Promise<string|Uint8Array>{
    return arweave.transactions.getData(txid, {decode: true,string: true});
  }
}
