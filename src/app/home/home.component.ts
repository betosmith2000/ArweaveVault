import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ArweaveService } from '../services/arweave.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn : boolean= false;
  constructor(private _authService : AuthService,   private _service : ArweaveService) { 
    _authService.currentWallet.subscribe(e=>{
      if(e.kty)  {  
        this.isLoggedIn=true;
        // setTimeout(() => {
        //   let txids = this._service.getAll().then( e=>{
        //     debugger
        //   });  
        // }, 2000);
      }
      else
        this.isLoggedIn=false;
    });

   
     
    

  }

  ngOnInit(): void {

  }

}
