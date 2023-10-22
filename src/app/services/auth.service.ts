import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from './database.service';
import { showToast } from '../tools/message-routines';

@Injectable()

export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router, private bd: DatabaseService, private storage: Storage) { }

  inicializarAutenticacion() {
    this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async login(email: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.bd.actualizarSesionActiva(email, 'S');
        this.storage.set(this.keyUsuario, usuarioAutenticado);
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(email, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
            this.bd.actualizarSesionActiva(email, 'S');
            this.storage.set(this.keyUsuario, usuario);
            this.usuarioAutenticado.next(usuario);
            this.router.navigate(['inicio']);
          } else {
            showToast(`El email o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        });
      }
    });
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.bd.actualizarSesionActiva(usuario.email, 'N');
        this.storage.remove(this.keyUsuario);
        this.usuarioAutenticado.next(null);
        this.router.navigate(['ingreso']);
      } else {
        this.router.navigate(['ingreso']);
      }
    })
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario).then(usuario => usuario as Usuario);
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  setUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }
  guardarUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

}
