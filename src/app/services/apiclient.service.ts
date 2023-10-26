import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { showToast } from '../tools/message-routines';

export interface Publicacion {
  id: string,
  correo: string;
  nombre: string;
  apellido: string;
  titulo: string;
  contenido: string;
};

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    })
  };

  listaPublicaciones: BehaviorSubject<Publicacion[]> = new BehaviorSubject<Publicacion[]>([]);
  apiUrl = "http://localhost:3000"; // usa esta si tienes el localhost sin configuraciones
  // descarga npm i -g json-server
  // crea un archivo json con esto {
  //   "publicaciones":[
  //     {
  //         "id":"001",
  //         "email":"tumama@gmail.com",
  //         "nombre":"markaqla",
  //         "apellido":"yaxs",
  //         "titulo":"tumamaeputa",
  //         "contenido":"peasogil"
  //     }
  // ]
  // }
  // luego usa json-server --watch tuarchivo.json
  
  constructor(private http: HttpClient) { }

  async cargarPublicaciones() {
    this.leerPublicaciones().subscribe({
      next: (publicaciones) => {
        this.listaPublicaciones.next(publicaciones as Publicacion[]);
      },
      error: (error: any) => {
        showToast('El servicio API Rest de Publicaciones no está disponible');
        this.listaPublicaciones.next([]);
      }
    });
  }

  crearPublicacion(publicacion: any): Observable<any> {
    return this.http.post(this.apiUrl + '/publicaciones/', publicacion, this.httpOptions).pipe(
      retry(3)
    );
  }

  leerPublicaciones(): Observable<any> {
    return this.http.get(this.apiUrl + '/publicaciones/').pipe(
      retry(3)
    );
  }

  leerPublicacion(idPublicacion: number): Observable<any> {
    return this.http.get(this.apiUrl + '/publicaciones/' + idPublicacion).pipe(
      retry(3)
    );
  }

  actualizarPublicacion(publicacion: any): Observable<any> {
    return this.http.put(this.apiUrl + '/publicaciones/' + publicacion.id, publicacion, this.httpOptions)
      .pipe(retry(3)
    );
  }

  eliminarPublicacion(publicacionId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/publicaciones/' + publicacionId, this.httpOptions).pipe(
      retry(3)
    );
  }

}
