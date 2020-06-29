import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GlobalsService{
    public readonly AppNameKey = "App-Name";
    public readonly AppNameValue = "ArweaveVaultTest2";
}