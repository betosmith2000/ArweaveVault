import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArweaveService } from 'src/app/services/arweave.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-images-new',
  templateUrl: './images-new.component.html',
  styleUrls: ['./images-new.component.scss']
})
export class ImagesNewComponent implements OnInit {
  isSaving:boolean = false;
  form:FormGroup;
  files: File[] = [];

  content = new FormControl('', [Validators.required]);
  fileName = new FormControl('', [Validators.required]);
  mimeType = new FormControl('', [Validators.required]);
  

  onSelect(event) {
    let selectedFiles =event.addedFiles[0];
    if(this.files.length==0){
      this.files.push(selectedFiles);
      this.content.setValue(selectedFiles);
      this.fileName.setValue(selectedFiles.name)
      this.mimeType.setValue(selectedFiles.type)
    }
  }


  closeDialog = false;
  constructor(private service: ArweaveService, 
    public dialogRef: MatDialogRef<ImagesNewComponent>,
    private _globals: GlobalsService) { 

    
  }

  ngOnInit(): void {
    this.service.currentWallet
    this.form = new FormGroup({
      content:this.content,
      fileName:this.fileName,
      mimeType:this.mimeType
    });

  }


  getErrorMessage() {
    if (this.content.hasError('required')) {
      return 'You must enter a image';
    }
    
  }

  save(){
    let p = Object.assign({}, this.form.value);
   
    if(this.form.valid){

      this.isSaving=true;
      var reader = new FileReader();
      
      reader.onload = e => {
        var target: any = e.target;
        p.content = target.result;
debugger
        this.service.add(p, this._globals.ImageDataTypeValue, p.content.name ).then((tx)=>{
          this.isSaving = false;
          this.dialogRef.close(tx);
          
        });
        
      };
      reader.readAsDataURL(p.content);

      
      
      
    }
  }

  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    if(this.files.length==0){
      this.content.setValue(null);
    }
  }

}
