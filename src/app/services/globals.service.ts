import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GlobalsService{
    public readonly AppNameKey = "App-Name";
    public readonly AppNameValue = "ArweaveVaultTest2";

    public readonly DataTypeKey = "Data-type";
    public readonly FileNameKey = "File-name";
    public readonly PasswordDataTypeValue = "Password-DataTypeTest16";
    public readonly NoteDataTypeValue = "Note-DataTypeTest4";
    public readonly ImageDataTypeValue = "Image-DataTypeTest7";
    public readonly AnyDataTypeValue = "";

    
}