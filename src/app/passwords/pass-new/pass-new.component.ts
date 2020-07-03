import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ArweaveService } from 'src/app/services/arweave.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/services/globals.service';
import * as passgenerator from 'generate-password-browser';

@Component({
  selector: 'app-pass-new',
  templateUrl: './pass-new.component.html',
  styleUrls: ['./pass-new.component.scss']
})
export class PassNewComponent implements OnInit {
  isSaving:boolean = false;
  form:FormGroup;

  url = new FormControl('', [Validators.required]);
  userName=new FormControl('', [Validators.required]);
  userPassword=new FormControl('', [Validators.required]);
  notes =new FormControl('');
  hide = true;
  closeDialog = false;
  constructor(private service: ArweaveService, 
    public dialogRef: MatDialogRef<PassNewComponent>,
    private _globals: GlobalsService) { 

    
  }

  ngOnInit(): void {
    this.service.currentWallet
    this.form = new FormGroup({
      url:this.url,
      userName:this.userName,
      userPassword:this.userPassword,
      notes:this.notes
    });

  }


  getErrorMessage() {
    if (this.url.hasError('required')) {
      return 'You must enter a url';
    }
    if (this.userPassword.hasError('required')) {
      return 'You must enter a password';
    }

    if (this.userName.hasError('required')) {
      return 'You must enter a user name';
    }

  }

  save(){
    let p = Object.assign({}, this.form.value);

    if(this.form.valid){
      this.isSaving=true;
      this.service.add(p, this._globals.PasswordDataTypeValue, null ).then((tx)=>{
        this.isSaving = false;
        this.dialogRef.close(tx);
        
      });
      
    }
  }


  generatePassword(){
    var password = passgenerator.generate({
      numbers:true,
      length:16,
      symbols:true,
      uppercase:true,
      strict:true
    });

    this.userPassword.setValue(password);
  }


}
