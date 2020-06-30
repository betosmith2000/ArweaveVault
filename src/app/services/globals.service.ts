import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GlobalsService{
    public readonly AppNameKey = "App-Name";
    public readonly AppNameValue = "ArweaveVaultTest2";

    public readonly DataTypeKey = "Data-type";
    public readonly PasswordDataTypeValue = "TypePassword";
    public readonly NoteDataTypeValue = "NotePassword";
    public readonly ImageDataTypeValue = "ImagePassword";
    public readonly AnyDataTypeValue = "";

    
}