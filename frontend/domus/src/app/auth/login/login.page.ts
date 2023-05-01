import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  login(formularioLogin: NgForm){

    this.usuarioService.obtenerUsuarios(formularioLogin.controls["nombre"].value).subscribe(async (res: any) => {

      if (res['usuarios'][0].length > 0) {

        localStorage.setItem('usuario', JSON.stringify(res['usuarios'][0][0]));

        if(formularioLogin.controls["pin"].value == res['usuarios'][0][0].pin){

          if(res['usuarios'][0][0].administrador){
            this.router.navigateByUrl('menu-secciones');
          }
          else{
            this.router.navigateByUrl('/panel-control');
          }
        }
        else{
            const alertMal = await this.alertController.create({
              header: 'Error al iniciar sesión',
              subHeader: "El nombre de usuario o el pin son incorrectos",
              buttons: [{text: 'Aceptar', cssClass: 'botonOKModal'}],
              cssClass: 'modal'
            });
            await alertMal.present();
        }

      }
      else{
        const alertMal = await this.alertController.create({
          header: 'Error al iniciar sesión',
          subHeader: 'El nombre de usuario o el pin son incorrectos',
          buttons: [{text: 'Aceptar', cssClass: 'botonOKModal'}],
          cssClass: 'modal'
        });
        await alertMal.present();
      }
    }, async (error) => {
        const msg = error.error.msg || 'Se ha producido un error iniciando sesión, vuelva a intentarlo';
          const alertMal = await this.alertController.create({
            header: 'Error al iniciar sesión',
            subHeader: msg,
            buttons: [{text: 'Aceptar', cssClass: 'botonOKModal'}],
            cssClass: 'modal'
          });
          await alertMal.present();
    });
  }

}
