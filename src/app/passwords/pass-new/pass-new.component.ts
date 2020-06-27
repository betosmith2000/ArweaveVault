import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pass-new',
  templateUrl: './pass-new.component.html',
  styleUrls: ['./pass-new.component.scss']
})
export class PassNewComponent implements OnInit {

  url = new FormControl('', [Validators.required]);
  userName=new FormControl('', [Validators.required]);
  userPassword=new FormControl('', [Validators.required]);
  notes =new FormControl('');
  hide = true;
  constructor() { }

  ngOnInit(): void {
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


}
