import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';    // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Alerta } from '../../modelo/alerta';
import { LoginDTO } from '../../modelo/login-dto';
import { RegistroUsuarioDTO } from '../../modelo/registro-usuario-dto';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]  // Importa FormsModule, CommonModule aquí
})


export class LoginComponent {
  loginDTO: LoginDTO;
  email:string[];
  password:string[];
  alerta!:Alerta;
  
  constructor(private authService: AuthService,private tokenService: TokenService) {
    this.loginDTO = new LoginDTO();
    this.email = [];    
    this.password = [];
  }
  
  public login(){
    console.log(this.loginDTO);
    this.authService.login(this.loginDTO).subscribe({
    next: data => {
    this.tokenService.login(data.respuesta.token);
  },
  error: error => {
  this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
  }
  });
  }

  

}


