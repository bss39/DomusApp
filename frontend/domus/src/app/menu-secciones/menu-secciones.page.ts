import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-secciones',
  templateUrl: './menu-secciones.page.html',
  styleUrls: ['./menu-secciones.page.scss'],
})
export class MenuSeccionesPage implements OnInit {

  constructor(private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
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
