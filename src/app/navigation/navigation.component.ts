import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ArweaveService } from '../services/arweave.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title:string = "Home";
  toolBarVisibility: boolean= true;

  constructor(private breakpointObserver: BreakpointObserver, private arweave: ArweaveService,
    public _router: Router) {
    
        
  }
    
  isToolBarVisible():boolean{
    // let visible = this.getRoute(this._router.url).toLocaleLowerCase()
    // if(visible == "home" || visible=="login" || visible == "")
    //  return false;
    //  else
      return true;

  }
  goToHome(){
    this._router.navigate(['/home']);

  }

  getRoute(route:string):string{
    let parts = route.split('?');

    let f = parts[0].replace('/','');
    
    return f.charAt(0).toUpperCase() + f.slice(1)
  }
}
