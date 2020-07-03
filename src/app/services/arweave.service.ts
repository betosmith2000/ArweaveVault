import { Injectable } from '@angular/core';
import Arweave from 'arweave/web';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';
import { ArQLModel } from '../models/arql/arql.model';
import { CryptoService } from '../services/crypto.service';

const  arweave = Arweave.init({});

@Injectable({
  providedIn: 'root'
})
export class ArweaveService {
 
  currentWallet:any;
  currentAddress:string;
  
  constructor(private _authService: AuthService, private _globals: GlobalsService, private _cryptoService: CryptoService) { 
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
    let encryptedData = await this._cryptoService.encrypt(JSON.stringify(data), this.currentAddress);
    let transaction = await arweave.createTransaction({
      data: encryptedData
    }, this.currentWallet);

    transaction.addTag(this._globals.AppNameKey,this._globals.AppNameValue);
    transaction.addTag(this._globals.DataTypeKey,dataType);
    if(fileName)
      transaction.addTag(this._globals.FileNameKey,fileName);
    
    await arweave.transactions.sign(transaction, this.currentWallet);

    const response = await arweave.transactions.post(transaction);
  
    let obj = Object.assign({isPending:true, txid: transaction.id}, data );
  
    return obj;
    

  }

  getTXStatus(txid:string){
    return arweave.transactions.getStatus(txid);
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

  async getTXContent(txid:string): Promise<Uint8Array>{
    
    let encryptedData = await arweave.transactions.getData(txid, {decode: true});
    
    return  this._cryptoService.decrypt(encryptedData, this.currentWallet);
  }

  public bufferToString(buffer:any){
    return  arweave.utils.bufferToString(buffer);
  }
}
