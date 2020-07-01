import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GlobalsService{
    public readonly AppNameKey = "App-Name";
    public readonly AppNameValue = "ArweaveVaultTest2";

    public readonly DataTypeKey = "Data-type";
    public readonly FileNameKey = "File-name";
    public readonly PasswordDataTypeValue = "Password-DataTypeTest";
    public readonly NoteDataTypeValue = "Note-DataTypeTest1";
    public readonly ImageDataTypeValue = "Image-DataTypeTest2";
    public readonly AnyDataTypeValue = "";

    
}