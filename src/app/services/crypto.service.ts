import { Injectable } from '@angular/core';
import Arweave from 'arweave/web';

const  arweave = Arweave.init({});
@Injectable({
    providedIn: 'root'
  })
export class CryptoService{

  constructor(){}
    
  async encrypt(data, address) {
    const key = await this.address2key(address);
    const contentEncoder = new TextEncoder();
    const contentBuffer = contentEncoder.encode(data);
    const keyBuffer = this.randomValues(256);

    const encryptedKey = await window.crypto.subtle.encrypt({name: 'RSA-OAEP'}, key, keyBuffer);
    const encryptedContent = await arweave.crypto.encrypt(contentBuffer, keyBuffer);

    return arweave.utils.concatBuffers([encryptedKey, encryptedContent]);
  }


  
  async decrypt(data, wallet){
    const key = await this.wallet2key(wallet);

    const encryptedKey = new Uint8Array(data.slice(0, 512));
    const encryptedContent = new Uint8Array(data.slice(512));

    let symmetricKey = null;
     await window.crypto.subtle.decrypt({name: 'RSA-OAEP'}, key, encryptedKey).then(sk=>{
      symmetricKey = sk
    });

    return arweave.crypto.decrypt(encryptedContent, symmetricKey);
  };

  
  async wallet2key(wallet){
  const keyData = Object.create(wallet);

  keyData.alg = 'RSA-OAEP-256';
  keyData.ext = true;

  return await window.crypto.subtle.importKey(
      'jwk',
      keyData,
      {name: 'RSA-OAEP', hash: {name: 'SHA-256'}},
      false,
      ['decrypt']
  );
};

  async address2key(address) {
    const txId = await arweave.wallets.getLastTransactionID(address);
    if (!txId) {
        return undefined;
    }
    const tx = await arweave.transactions.get(txId);
    if (!tx) {
        return undefined;
    }
    const keyData = {
        kty: 'RSA',
        e: 'AQAB',
        n: tx.owner,
        alg: 'RSA-OAEP-256',
        ext: true
    };
    return await crypto.subtle.importKey(
        'jwk',
        keyData,
        {name: 'RSA-OAEP', hash: {name: 'SHA-256'}},
        false,
        ['encrypt']
    );
  }
  randomValues(length){
    let array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return array;
  };
}