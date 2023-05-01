import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { Accion } from '../models/accion.model';
import { AccionService } from '../services/accion.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro-acciones',
  templateUrl: './registro-acciones.page.html',
  styleUrls: ['./registro-acciones.page.scss'],
})
export class RegistroAccionesPage implements OnInit {

  @ViewChild('modalBuscar') modalBuscar: IonModal | undefined;

  public acciones: Accion[] = [];
  public textoBusq: string = "";
  public usuarios: Array<Usuario> = [];

  public formBuscar: FormGroup = this.formBuilder.group({
    texto: ['']
  });

  constructor(private router: Router,
              private alertController: AlertController,
              private usuarioService: UsuarioService,
              private accionService: AccionService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mostrarAcciones();
  }

  mostrarAcciones(){
    this.accionService.obtenerAcciones(this.textoBusq).subscribe(async (res: any) => {
      this.acciones = res['acciones'][0];

      this.acciones.forEach((accion : Accion) => {
        this.usuarioService.obtenerUsuario(accion.usuario_id).subscribe((res: any) => {
          if(!this.usuarios.find((usu) => usu.id == res['usuario'].id)?.nombre)
            this.usuarios.push(res['usuario']);
        });
      });
    }), (error: any) => {
      console.error(error);
    }
  }

  async busqueda(){

    if(!this.formBuscar.value.texto) this.formBuscar.get('texto')?.setValue("");

    this.accionService.obtenerAcciones(this.formBuscar.value.texto).subscribe(async (res: any) => {
      this.textoBusq = this.formBuscar.value.texto;
      this.modalBuscar?.dismiss(null, 'cancel');
      this.ngOnInit();
    }, async (error) => {
      const msg = error.error.msg || 'La búsqueda no se ha realizado correctamente, vuelva a intentarlo';
      const alertMal = await this.alertController.create({
        header: 'Error',
        subHeader: msg,
        buttons: [{text: 'Aceptar', cssClass: 'botonOKModal'}],
        cssClass: 'modal',
        backdropDismiss: false
      });
      await alertMal.present();
    });
  }

  cancelarModalBuscar() {
    this.formBuscar.reset();
    this.modalBuscar?.dismiss(null, 'cancel');
  }

  async eliminarAccion(accion: Accion){
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar la acción '+accion?.descripcion+'?',
      cssClass: 'modal',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'botonNOTOKModal',
          handler: () => {}
        },
        {
          text: 'Eliminar',
          cssClass: 'botonOKModal',
          handler: () => {
            this.accionService.eliminarAccion(accion.id).subscribe((res: any) => {
              this.ngOnInit();
            }), (error: any) => {
              console.error(error);
            };
          }
        }
      ]
    });

    await alert.present();
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
