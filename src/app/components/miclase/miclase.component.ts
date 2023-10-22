import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { Asistencia } from 'src/app/models/asistencia';
import { DatabaseService } from 'src/app/services/database.service';



@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, CommonModule, FormsModule],
})
export class MiclaseComponent {

  asistencia= new Asistencia();

  constructor(private bd: DatabaseService) {
    this.bd.datosQR.subscribe((datosQR) => {
      this.asistencia = new Asistencia().obtenerAsistenciaDesdeQR(datosQR);
    })
  }

}
