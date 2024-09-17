import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';    // Importar FormsModule
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Router } from '@angular/router';
import { RegistroUsuarioDTO } from '../../modelo/registro-usuario-dto';
import { AuthService } from '../../servicios/auth.service';
import { Alerta } from '../../modelo/alerta';
import { MensajeDTO } from '../../modelo/mensaje-dto'; // Asegúrate de importar MensajeDTO

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [FormsModule, CommonModule]  // Importa FormsModule, CommonModule aquí
})
export class RegistroComponent {
  registroUsuarioDTO: RegistroUsuarioDTO;
  generos: string[] = [];
  alerta!: Alerta;

  constructor(private authService: AuthService, private router: Router) {
    // Asignar valor por defecto a rol
    this.registroUsuarioDTO = new RegistroUsuarioDTO();
    this.registroUsuarioDTO.rol = "user";  // Valor predeterminado
    this.cargarGeneros();
  }

  public registrar(): void {
    // Asegurar que no se pueda modificar el rol
    this.registroUsuarioDTO.rol = "user";  // Bloquear modificación del rol

    if (this.sonIguales()) {
      this.authService.registrarUsuario(this.registroUsuarioDTO).subscribe({
        next: (data: MensajeDTO) => {
          console.log('Respuesta del servidor:', data);
          if (!data.error) {
            this.alerta = { mensaje: data.respuesta, tipo: "success" }; // Usa data.respuesta
            this.router.navigateByUrl('/inicio');
          } else {
            this.alerta = { mensaje: 'Error en la respuesta del servidor', tipo: "danger" };
          }
        },
        error: (error) => {
          console.log('Error recibido:', error);
          this.alerta = { 
            mensaje: error.error?.respuesta || 'Error desconocido', 
            tipo: "danger" 
          }; // Usa error.error?.respuesta
        }
      });
    } else {
      this.alerta = { mensaje: "Las contraseñas no coinciden", tipo: "danger" };
    }
  }

  public sonIguales(): boolean {
    return this.registroUsuarioDTO.password === this.registroUsuarioDTO.confirmaPassword;
  }

  private cargarGeneros(): void {
    this.generos.push("MASCULINO", "FEMENINO", "OTRO");
  }
}

