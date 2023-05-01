import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Elemento } from '../models/elemento.model';
import { ElementoService } from '../services/elemento.service';
import { AlertController, IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionService } from '../services/accion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detalle-elemento',
  templateUrl: './detalle-elemento.page.html',
  styleUrls: ['./detalle-elemento.page.scss'],
})
export class DetalleElementoPage implements OnInit {

  @ViewChild('modalEditar') modalEditar: IonModal | undefined;

  public usuario: any;
  public idElemento: number = -1;
  public elemento: Elemento | undefined;
  public abrirModalEditar: boolean = false;
  public textoBoton: string = "";

  public formEditar: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    estado: "",
    descripcion: ['', Validators.required],
    icono: ['', Validators.required]
  });

  constructor(private router: Router,
              private alertController: AlertController,
              private elementoService: ElementoService,
              private accionService: AccionService,
              private formBuilder : FormBuilder) { }

  ngOnInit() {

    let usu = localStorage.getItem('usuario');
    if(usu) this.usuario = JSON.parse(usu);
    this.idElemento = Number(this.router.url.split('/')[3]);
    this.mostrarElemento();
  }

  mostrarElemento(){
    this.elementoService.obtenerElemento(this.idElemento).subscribe((res: any) => {
      this.elemento = res['elemento'];
      this.textoBoton = this.elemento?.estado == "Apagado" ? "Encender" : "Apagar";
    });
  }

  cambiarEstado(estadoActual: string | undefined){

    let data = {
      nombre: this.elemento?.nombre,
      estado: estadoActual == "Apagado" ? "Encendido" : "Apagado",
      descripcion: this.elemento?.descripcion
    }

    this.elementoService.editarElemento(this.idElemento, data).subscribe((res: any) => {
      let eleData = {
        elemento: "",
        tipo: ""
      };
        if (data.estado == "Encendido"){

          if (this.elemento?.icono == "tv"){
            eleData.elemento = "media_player.tv_salon";
            eleData.tipo = "media_player";
            this.elementoService.play(eleData).subscribe((resPlayTv: any) => {
            });
          }
          else if (this.elemento?.icono == "radio" || this.elemento?.icono == "altavoz"){
            eleData.elemento = "media_player.salon";
            eleData.tipo = "media_player";
            this.elementoService.play(eleData).subscribe((resPlay: any) => {
            });
          }
          else if (this.elemento?.icono == "luz"){
            eleData.elemento = "switch.osram_plug_01_switch";
            eleData.tipo = "switch";
            this.elementoService.encender(eleData).subscribe((resEncender: any) => {
            });
          }
        }
        else if (data.estado == "Apagado"){
          if(this.elemento?.icono == "tv"){
            eleData.elemento = "media_player.tv_salon";
            eleData.tipo = "media_player"
          }
          else if(this.elemento?.icono == "radio" || this.elemento?.icono == "altavoz"){
            eleData.elemento = "media_player.salon";
            eleData.tipo = "media_player";
          }
          else if(this.elemento?.icono == "luz"){
            eleData.elemento = "switch.osram_plug_01_switch";
            eleData.tipo = "switch";
          }

          this.elementoService.apagar(eleData).subscribe((resApagar: any) => {
          });;
        }

        let dataAccion = {
          descripcion: `${data.nombre} está ${data.estado}`,
          fecha: moment().format('YYYY-MM-DD'),
          hora: moment().format('HH:mm'),
          usuario_id: this.usuario.id,
          elemento_id: this.elemento?.id
        }
        this.accionService.agregarAccion(dataAccion).subscribe((res: any) => {
        });
        this.ngOnInit();
    }), (error: any) =>{
      console.error(error);
    };
  }

  abrirModalEditarElemento(){
    this.abrirModalEditar = true;

    this.formEditar.get('nombre')?.setValue(this.elemento?.nombre);
    this.formEditar.get('estado')?.setValue(this.elemento?.estado);
    this.formEditar.get('descripcion')?.setValue(this.elemento?.descripcion);
    this.formEditar.get('icono')?.setValue(this.elemento?.icono);
  }

  async editarElemento(){

    if(this.formEditar.valid){
      this.elementoService.editarElemento(this.idElemento,this.formEditar.value).subscribe(async (res: any) => {
        this.formEditar.reset();
        this.modalEditar?.dismiss(null, 'cancel');
        this.ngOnInit();

        const alertBien = await this.alertController.create({
          header: 'El elemento '+res['elementoActualizado'].nombre+' se ha actualizado correctamente',
          buttons: [{text: 'Aceptar', cssClass: 'botonOKModal'}],
          cssClass: 'modal',
          backdropDismiss: false
        });
        await alertBien.present();

      }, async (error) => {
        const msg = error.error.msg || 'No se ha actualizado correctamente, vuelva a intentarlo';
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
    else{
      const alertMal = await this.alertController.create({
        header: 'El formulario no es válido',
        subHeader: 'Deben cumplimentarse todos los campos',
        buttons: [{text: 'Aceptar', cssClass: 'botonOKModal',}],
        cssClass: 'modal',
        backdropDismiss: false
      });
      await alertMal.present();
    }
  }

  cancelarModalEditar(){
    this.formEditar.reset();
    this.modalEditar?.dismiss(null, 'cancel');
  }

  async eliminarElemento(){
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar '+this.elemento?.nombre+'?',
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
            this.elementoService.eliminarElemento(this.idElemento).subscribe((res: any) => {
              this.router.navigateByUrl("/panel-control");
            });
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
