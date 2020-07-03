import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PassNewComponent } from '../pass-new/pass-new.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArweaveService } from 'src/app/services/arweave.service';
import { AuthService } from 'src/app/services/auth.service';
import {PasswordModel} from '../../models/password/password.model';
import { GlobalsService } from 'src/app/services/globals.service';
import { timer } from "rxjs";

@Component({
  selector: 'app-pass-home',
  templateUrl: './pass-home.component.html',
  styleUrls: ['./pass-home.component.scss']
})
export class PassHomeComponent implements OnInit {
  time = timer(5000, 120000);
  isLoading : boolean = false;
  durationInSeconds = 10;
  objectArray : Array<PasswordModel> = new Array<PasswordModel>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,
    private _service : ArweaveService, private _authService:AuthService,
    private _globals : GlobalsService
   ) { 
      this.time.subscribe(val => {
        let pendingTx = this.objectArray.filter(e=>e.isPending);
        if(pendingTx.length> 0){
          pendingTx.forEach(tx=>{
            _service.getTXStatus(tx.txid).then(s=>{
              if(s.confirmed){
                if(!tx.url){
                    this._service.getTXContent(tx.txid).then(txData=>{
                      let obj = this.objectArray.filter(e=>e.txid == tx.txid)[0];
                      tx.isPending=false;
                      let data = txData?JSON.parse(_service.bufferToString(txData)):"";
                      obj.userName = data.userName;
                      obj.userPassword = data.userPassword;
                      obj.notes = data.notes;
                      obj.url = data.url;
                    })
                }
                else{
                  tx.isPending=false;
                }
              }
            });
          })
        }
      });
    
      _authService.currentWallet.subscribe(e=>{
        if(e.kty)  {  
          setTimeout(() => {
            this.isLoading=true;
            let txids = this._service.getAll(_globals.PasswordDataTypeValue).then( e=>{
              e.forEach(tx=>{
                this._service.getTXContent(tx).then(txData=>{
                  let isPending = !txData  ? true:false;
                  let objPassword = Object.assign({userNameHide:true, userPasswordHide:true, isPending : isPending, txid: tx},new PasswordModel(), txData?JSON.parse(_service.bufferToString(txData)):""  )
                  if(!objPassword.url){
                    objPassword.userName="";
                    objPassword.userPassword="";
                    objPassword.name="";
                    objPassword.url="";
                  }
                  this.objectArray.push(objPassword);
                })
              })
            }).catch(r=>{
              this.isLoading = false;
            }).finally(()=> {
              this.isLoading = false;
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
      if(result){
        let obj = Object.assign({isPending:true, userNameHide:true, userPasswordHide:true},new PasswordModel(), result );
        this.objectArray.push(obj)
        this._snackBar.open("Transaction sent, wait for confirmation, txid: " + result.txid, "OK", {
          duration: this.durationInSeconds * 1000,
        });
      }
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
