import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GlobalsService{
    public readonly AppNameKey = "App-Name";
    public readonly AppNameValue = "ArweaveVault_v1";

    public readonly DataTypeKey = "Data-type";
    public readonly FileNameKey = "File-name";
    public readonly PasswordDataTypeValue = "Password-DataType_1";
    public readonly NoteDataTypeValue = "Note-DataType_1";
    public readonly ImageDataTypeValue = "Image-DataType_1";
    public readonly AnyDataTypeValue = "";

    
}