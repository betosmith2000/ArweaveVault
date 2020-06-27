import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn : boolean= false;
  constructor(private _authService : AuthService) { 
    _authService.currentWallet.subscribe(e=>{
      if(e.kty)    
        this.isLoggedIn=true;
      else
        this.isLoggedIn=false;
    });

  }

  ngOnInit(): void {

  }

}
