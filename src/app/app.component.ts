import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet]
})

export class AppComponent implements OnInit {

  title = 'Biblioteca FG';
isLogged = false;
roles: string[] = [];
email:string = "";
constructor(private tokenService:TokenService) { }
ngOnInit(): void {
this.isLogged = this.tokenService.isLogged();
if(this.isLogged){
this.email = this.tokenService.getEmail();
this.roles = this.tokenService.getRole();  
}
}
public logout(){
this.tokenService.logout();
}
}
