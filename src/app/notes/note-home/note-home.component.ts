import { Component, OnInit } from '@angular/core';
import {NoteModel} from '../../models/note/note.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArweaveService } from 'src/app/services/arweave.service';
import { AuthService } from 'src/app/services/auth.service';
import { NoteNewComponent } from '../note-new/note-new.component';
import { GlobalsService } from 'src/app/services/globals.service';
import { timer } from "rxjs";

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.scss']
})
export class NoteHomeComponent implements OnInit {
  time = timer(5000, 120000);
  isLoading : boolean = false;
  durationInSeconds = 10;
  objectArray : Array<NoteModel> = new Array<NoteModel>();

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
              if(!tx.name){
                debugger
                  this._service.getTXContent(tx.txid).then(txData=>{
                    let obj = this.objectArray.filter(e=>e.txid == tx.txid)[0];
                    tx.isPending=false;
                    let data = txData?JSON.parse(txData as string):"";
                    obj.name = data.name;
                    obj.notes = data.notes;
                  })
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
            let txids = this._service.getAll(_globals.NoteDataTypeValue).then( e=>{
              e.forEach(tx=>{
                this._service.getTXContent(tx).then(txData=>{
                  let isPending = !txData  ? true:false;
                  let objNote = Object.assign({hide:true, isPending : isPending, txid: tx},new NoteModel(),  txData?JSON.parse(txData as string):"" )
                  if(!objNote.name){
                    objNote.notes="";
                    objNote.name="";
                  }
                  this.objectArray.push(objNote);
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

    const dialogRef = this.dialog.open(NoteNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let obj = Object.assign({isPending:true, hide:true},new NoteModel(), result );
        this.objectArray.push(obj)
        this._snackBar.open("Transaction sent, wait for confirmation, txid: " + result.txid, "OK", {
          duration: this.durationInSeconds * 1000,
        });
      }
    });

  }

}
