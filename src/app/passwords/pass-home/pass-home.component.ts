import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PassNewComponent } from '../pass-new/pass-new.component';

@Component({
  selector: 'app-pass-home',
  templateUrl: './pass-home.component.html',
  styleUrls: ['./pass-home.component.scss']
})
export class PassHomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  add(){

    const dialogRef = this.dialog.open(PassNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
