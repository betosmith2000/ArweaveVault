import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PassNewComponent } from '../pass-new/pass-new.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArweaveService } from 'src/app/services/arweave.service';
import { AuthService } from 'src/app/services/auth.service';
import {PasswordModel} from '../../models/password/password.model';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-pass-home',
  templateUrl: './pass-home.component.html',
  styleUrls: ['./pass-home.component.scss']
})
export class PassHomeComponent implements OnInit {

  durationInSeconds = 10;
  passwordArray : Array<PasswordModel> = new Array<PasswordModel>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,
    private _service : ArweaveService, private _authService:AuthService,
    private _globals : GlobalsService
   ) { 
      _authService.currentWallet.subscribe(e=>{
        if(e.kty)  {  
          setTimeout(() => {
            let txids = this._service.getAll(_globals.PasswordDataTypeValue).then( e=>{
              e.forEach(tx=>{
                this._service.getTXContent(tx).then(txData=>{
                  let objPassword = Object.assign({userNameHide:true, userPasswordHide:true},new PasswordModel(), JSON.parse(txData as string) )
                  this.passwordArray.push(objPassword);
                });
              })
            });    
          }, 500);
          
        }

      });
  

    }

  ngOnInit(): void {
    

  }

  add(){

    const dialogRef = this.dialog.open(PassNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this._snackBar.open("Transaction sent, wait for confirmation, txid: " + result, "OK", {
        duration: this.durationInSeconds * 1000,
      });
    });

  }


  
  launchApp(p:PasswordModel){
    if(this.validURL(p.url))
      if(!(p.url.indexOf('http://')>=0))
      {
        var url = 'http://' + p.url;
        window.open(url,'_blank')
      }
      else{
        window.open(p.url,'_blank')
      }
  }

  

  validURL(str) {
    var pattern = new RegExp('^(https|http?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }



}
