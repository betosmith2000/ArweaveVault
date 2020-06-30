import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  files: File[] = [];

  constructor(private _authService: AuthService, private route: ActivatedRoute, private _snackBar: MatSnackBar,
    private router: Router) { 

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
  }
  
  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  login(){
    var f:File = this.files[0];
    if(!f){
      this._snackBar.open("You need to load your Arweave keyfile!", "OK", {
        duration:  5000,
      });
      return;
    }
    var reader = new FileReader();
    reader.onload = e => {
      var target: any = e.target;
      var data = target.result;
      this._authService.login(data) .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        });
    };
    reader.readAsText(f);
  }


  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }



}
