import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,QrComponent,MiclaseComponent,ForoComponent,MisdatosComponent]
})
export class InicioPage implements OnInit {
  
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo!: ElementRef;

  componenteActual="qr";

  constructor(private animationController:AnimationController) { }

  ngOnInit() {
  }

  cambiarComponente(event:any){
    this.componenteActual=event.detail.value;
  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(-50%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1);
    animation.play();
  }

}
