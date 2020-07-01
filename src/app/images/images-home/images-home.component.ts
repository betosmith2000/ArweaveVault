import { Component, OnInit } from '@angular/core';
import { ImageModel} from '../../models/image/image.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArweaveService } from 'src/app/services/arweave.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { ImagesNewComponent } from '../images-new/images-new.component';

@Component({
  selector: 'app-images-home',
  templateUrl: './images-home.component.html',
  styleUrls: ['./images-home.component.scss']
})
export class ImagesHomeComponent implements OnInit {


  durationInSeconds = 10;
  objectArray : Array<ImageModel> = new Array<ImageModel>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,
    private _service : ArweaveService, private _authService:AuthService,
    private _globals : GlobalsService
   ) { 
      _authService.currentWallet.subscribe(e=>{
        if(e.kty)  {  
          setTimeout(() => {
            let txids = this._service.getAll(_globals.ImageDataTypeValue).then( e=>{
              e.forEach(tx=>{
                this._service.getTXContent(tx).then(txData=>{
                  let objPassword = Object.assign({hide:true},new ImageModel(), JSON.parse(txData as string) )
                  this.objectArray.push(objPassword);
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

    const dialogRef = this.dialog.open(ImagesNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result)
        this._snackBar.open("Transaction sent, wait for confirmation, txid: " + result, "OK", {
          duration: this.durationInSeconds * 1000,
        });
    });

  }

}
