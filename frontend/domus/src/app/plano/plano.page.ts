import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-plano',
  templateUrl: './plano.page.html',
  styleUrls: ['./plano.page.scss'],
})
export class PlanoPage implements OnInit {

  public usuario: any;

  constructor(private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {

    let usu = localStorage.getItem('usuario');
    if(usu) {
      this.usuario = JSON.parse(usu);
    }

  }

  async logout(){
    const alert = await this.alertController.create({
      header: '¿Quiere cerrar sesión?',
      cssClass: 'modal',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'botonNOTOKModal',
          handler: () => {}
        },
        {
          text: 'Cerrar sesión',
          cssClass: 'botonOKModal',
          handler: () => {
            localStorage.clear();
            this.router.navigateByUrl("");
          }
        }
      ]
    });

    await alert.present();
  }

}
