import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';


@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput, CommonModule, FormsModule, IonButton],
})
export class MisdatosComponent  implements OnInit {

  usuario = new Usuario();
  repeticionPassword = '';

  constructor(private authService: AuthService, private bd: DatabaseService) { }

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
        this.repeticionPassword = usuario!.password;
      }
    })
  }

  mostrarMensaje(nombreCampo:string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }

  async actualizarPerfil() {
    if (!this.mostrarMensaje('nombre', this.usuario.nombre)) return;
    if (!this.mostrarMensaje('apellidos', this.usuario.apellido)) return;
    if (!this.mostrarMensaje('email', this.usuario.email)) return;
    if (!this.mostrarMensaje('pregunta secreta', this.usuario.preguntaSecreta)) return;
    if (!this.mostrarMensaje('respuesta secreta', this.usuario.respuestaSecreta)) return;
    if (!this.mostrarMensaje('contraseña', this.usuario.password)) return;
    if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC(`Las contraseñas escritas deben ser iguales.`);
      return;
    }
    await this.bd.guardarUsuario(this.usuario);
    this.authService.guardarUsuarioAutenticado(this.usuario);
    showToast('Sus datos fueron actualizados');
  }

}
