import { Component, OnInit } from '@angular/core';
import { ImageModel} from '../../models/image/image.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArweaveService } from 'src/app/services/arweave.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { ImagesNewComponent } from '../images-new/images-new.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-images-home',
  templateUrl: './images-home.component.html',
  styleUrls: ['./images-home.component.scss']
})
export class ImagesHomeComponent implements OnInit {
  time = timer(5000, 120000);
  isLoading : boolean = false;
  durationInSeconds = 10;
  objectArray : Array<ImageModel> = new Array<ImageModel>();

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
              if(!tx.content){
                  this._service.getTXContent(tx.txid).then(txData=>{
                    let obj = this.objectArray.filter(e=>e.txid == tx.txid)[0];
                    tx.isPending=false;
                    let data = txData?JSON.parse(txData as string):"";
                    obj.content = data.content;
                    obj.fileName = data.fileName;
                    obj.mimeType = data.mimeType;
                    
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
            let txids = this._service.getAll(_globals.ImageDataTypeValue).then( e=>{
              e.forEach(tx=>{
                this._service.getTXContent(tx).then(txData=>{
                  let isPending = !txData  ? true:false;
                  let obj = Object.assign({hide:true,  isPending : isPending, txid: tx},new ImageModel(), txData?JSON.parse(txData as string):"")
                  if(!obj.content){
                    obj.content="";
                    obj.fileName="";
                    obj.mimeType="";
                  }
                  this.objectArray.push(obj);
                });
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
    const dialogRef = this.dialog.open(ImagesNewComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let obj = Object.assign({isPending:true},new ImageModel(), result );
        this.objectArray.push(obj)
        this._snackBar.open("Transaction sent, wait for confirmation, txid: " + result.txid, "OK", {
          duration: this.durationInSeconds * 1000,
        });
      }
    });
  }

}
