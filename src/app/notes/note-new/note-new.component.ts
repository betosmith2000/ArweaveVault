import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArweaveService } from 'src/app/services/arweave.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss']
})
export class NoteNewComponent implements OnInit {
  isSaving:boolean = false;
  form:FormGroup;

  name = new FormControl('', [Validators.required]);
  
  notes =new FormControl('', [Validators.required]);
  hide = true;
  closeDialog = false;
  constructor(private service: ArweaveService, 
    public dialogRef: MatDialogRef<NoteNewComponent>,
    private _globals: GlobalsService) { 

    
  }

  ngOnInit(): void {
    this.service.currentWallet
    this.form = new FormGroup({
      name:this.name,
      notes:this.notes
    });

  }


  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.notes.hasError('required')) {
      return 'You must enter a note';
    }
  }

  save(){
    let p = Object.assign({}, this.form.value);

    if(this.form.valid){
      this.isSaving=true;
      this.service.add(p, this._globals.NoteDataTypeValue, null ).then((tx)=>{
        this.isSaving = false;
        this.dialogRef.close(tx);
        
      });
      
    }
  }

}
