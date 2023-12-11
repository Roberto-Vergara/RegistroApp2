import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  public email:string="atorres@duocuc.cl";
  public password:string="1234";

  



  constructor(private router:Router,private toastController:ToastController,private authService:AuthService) {
    
    // this.usuario= new Usuario("","","","","");
    // this.email="as";
    // this.password="as";
    // this.usuario.setUsuario('atorres@duocuc.cl', '1234');
   }

  ngOnInit() {
  }


  public ingresar():void{
    // this.usuario.llenarUsuariosValidos();
    // if(this.usuario.validarUsuario(this.usuario)){
    //   // enviar parametros
    //   const navigationExtras:NavigationExtras={
    //     state:{
    //       nombre:this.usuario.email
    //     }
    //   }
    //   this.router.navigate(['/inicio'],navigationExtras);
    // }else{
    //   this.toastController.create({
    //     duration:2000,
    //     position:"bottom",
    //     message:"usuario invalido"
    //   }).then(e=>e.present())
    // }
    this.authService.login(this.email,this.password);
  }

  public goCorreo():void{
    this.router.navigate(['/correo']);
  }
  
}