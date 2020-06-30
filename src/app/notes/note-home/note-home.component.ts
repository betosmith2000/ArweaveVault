import { Component, OnInit } from '@angular/core';
import {NoteModel} from '../../models/note/note.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArweaveService } from 'src/app/services/arweave.service';
import { AuthService } from 'src/app/services/auth.service';
import { NoteNewComponent } from '../note-new/note-new.component';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.scss']
})
export class NoteHomeComponent implements OnInit {

  durationInSeconds = 10;
  objectArray : Array<NoteModel> = new Array<NoteModel>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar,
    private _service : ArweaveService, private _authService:AuthService,
    private _globals : GlobalsService
   ) { 
      _authService.currentWallet.subscribe(e=>{
        if(e.kty)  {  
          setTimeout(() => {
            let txids = this._service.getAll(_globals.NoteDataTypeValue).then( e=>{
              e.forEach(tx=>{
                this._service.getTXContent(tx).then(txData=>{
                  let objPassword = Object.assign({hide:true},new NoteModel(), JSON.parse(txData as string) )
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

    const dialogRef = this.dialog.open(NoteNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this._snackBar.open("Transaction sent, wait for confirmation, txid: " + result, "OK", {
        duration: this.durationInSeconds * 1000,
      });
    });

  }

}
