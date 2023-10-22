import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent,
  IonInput, IonItem, IonTextarea } from '@ionic/angular/standalone';
import { Publicacion } from 'src/app/models/publicacion';
import { Usuario } from 'src/app/models/usuario';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { showAlertDUOC, showAlertError } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  standalone: true,
  imports: [IonContent, IonCard, IonCardHeader, IonCardTitle, IonItem, IonInput, 
    IonTextarea, IonButton, IonCardContent, FormsModule, CommonModule],
})
export class ForoComponent implements OnInit  {

  @ViewChild("topOfPage") topOfPage!: ElementRef;

  usuario = new Usuario();
  publicacion: Publicacion = new Publicacion();
  publicaciones: any;

  constructor(private authService: AuthService, private api: APIClientService) { 
    this.api.listaPublicaciones.subscribe((publicaciones) => {
      publicaciones.reverse(); // Ordenar de más nueva a mán antigua
      this.publicaciones = publicaciones;
    });
  }

  async ngOnInit() {
    const usu = await this.authService.leerUsuarioAutenticado();
    this.usuario = usu!;
    this.limpiarPublicacion();
  }

  setPublicacion(id: string, email: string, nombre: string, apellido: string, titulo: string, contenido: string) {
    this.publicacion.id = id;
    this.publicacion.email = email;
    this.publicacion.nombre = nombre;
    this.publicacion.apellido = apellido;
    this.publicacion.titulo = titulo;
    this.publicacion.contenido = contenido;
  }

  limpiarPublicacion() {
    this.setPublicacion('', '', '', '', '', '');
    this.api.cargarPublicaciones();
  }

  guardarPublicacion() {
    if (this.publicacion.titulo.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.contenido.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el contenido.');
      return;
    }
    if (this.publicacion.id === '') {
      this.crearPublicacion();
    }
    else {
      this.actualizarPublicacion();
    }
  }

  editarPublicacion(pub: any) {
    if (pub.email !== this.usuario.email) {
      showAlertDUOC('Sólo puede editar las publicaciones a su nombre')
      return;
    }
    this.setPublicacion(pub.id, pub.email, pub.nombre, pub.apellido, pub.titulo, pub.contenido);
    this.topOfPage.nativeElement.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  mensajePublicacion(accion: string, id: Publicacion) {
    showAlertDUOC(`La publicación ${id} fue ${accion} correctamente`);
    this.limpiarPublicacion();
  }

  crearPublicacion() {
    this.publicacion.id = '';
    this.publicacion.email = this.usuario.email;
    this.publicacion.nombre = this.usuario.nombre;
    this.publicacion.apellido = this.usuario.apellido;
    this.api.crearPublicacion(this.publicacion).subscribe({
      next: (publicacion) => this.mensajePublicacion('creada', publicacion.id),
      error: (error) => showAlertError('No fue posible crear la publicación.', error)
    });
  }

  actualizarPublicacion() {
    this.api.actualizarPublicacion(this.publicacion).subscribe({
      next: (publicacion) => this.mensajePublicacion('actualizada', publicacion.id),
      error: (error) => showAlertError('No fue posible actualizar la publicación.', error)
    });
  }

  eliminarPublicacion(pub: any) {
    if (pub.email !== this.usuario.email) {
      showAlertDUOC('Sólo puede eliminar las publicaciones a su nombre')
      return;
    }
    this.api.eliminarPublicacion(pub.id).subscribe({
      next: (publicacion) => this.mensajePublicacion('eliminada', pub.id),
      error: (error) => showAlertError('No fue posible eliminar la publicación.', error)
    });
  }

}
