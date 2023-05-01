import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { Elemento } from '../models/elemento.model';
import { ElementoService } from '../services/elemento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-control',
  templateUrl: 'panel-control.page.html',
  styleUrls: ['panel-control.page.scss'],
})
export class PanelControlPage {

  @ViewChild('modalAgregar') modalAgregar: IonModal | undefined;
  @ViewChild('modalBuscar') modalBuscar: IonModal | undefined;
  @ViewChild('modalEditar') modalEditar: IonModal | undefined;

  public abrirModalEditar: boolean = false;

  public usuario: any;
  public elementos: Elemento[] = [];
  public elementoSelec!: Elemento;
  public textoBusq: string = "";

  public formAgregar: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    estado:'Apagado',
    descripcion: ['', Validators.required],
    icono: ['', Validators.required]
  });

  public formBuscar: FormGroup = this.formBuilder.group({
    texto: ['']
  });

  public formEditar: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    icono: ['', Validators.required]
  });

  constructor(private router: Router,
              private alertController: AlertController,
              private elementoService: ElementoService,
              private formBuilder : FormBuilder) { }

  ionViewWillEnter() {

    let usu = localStorage.getItem('usuario');
    if(usu) { this.usuario = JSON.parse(usu); }
    this.mostrarElementos();
  }

  mostrarElementos(){

    this.elementoService.obtenerElementos(this.textoBusq).subscribe((res: any) => {
      this.elementos = res['elementos'][0];
    });
  }

  abrirModalEditarElemento(elemento: Elemento){
    this.abrirModalEditar = true;
    this.elementoSelec = elemento;

    this.formEditar.get('nombre')?.setValue(this.elementoSelec?.nombre);
    this.formEditar.get('estado')?.setValue(this.elementoSelec?.estado);
    this.formEditar.get('descripcion')?.setValue(this.elementoSelec?.descripcion);
    this.formEditar.get('icono')?.setValue(this.elementoSelec?.icono);
  }

  async editarElemento(){

    if(this.formEditar.valid){
      this.elementoService.editarElemento(this.elementoSelec?.id,this.formEditar.value).subscribe(async (res: any) => {
        this.formEditar.reset();
        this.modalEditar?.dismiss(null, 'cancel');
        this.abrirModalEditar = false;
        this.ionViewWillEnter();

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
    this.abrirModalEditar = false;
  }

  async eliminarElemento(elemento: Elemento){

    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar '+elemento?.nombre+'?',
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
            this.elementoService.eliminarElemento(elemento?.id).subscribe((res: any) => {
              this.ionViewWillEnter();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async busqueda(){

    if(!this.formBuscar.value.texto) this.formBuscar.get('texto')?.setValue("");

    this.elementoService.obtenerElementos(this.formBuscar.value.texto).subscribe(async (res: any) => {
      this.textoBusq = this.formBuscar.value.texto;
      this.modalBuscar?.dismiss(null, 'cancel');
      this.ionViewWillEnter();
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

  async agregarElemento(){

    if(this.formAgregar.valid){
      this.elementoService.agregarElemento(this.formAgregar.value).subscribe(async (res: any) => {
        this.formAgregar.reset();
        this.modalAgregar?.dismiss(null, 'cancel');
        this.ionViewWillEnter();

        const alertBien = await this.alertController.create({
          header: 'El elemento '+res['elemento'].nombre+' se ha agregado correctamente',
          buttons: [{text: 'Aceptar', cssClass: 'botonOKModal',}],
          cssClass: 'modal',
          backdropDismiss: false
        });
        await alertBien.present();

      }, async (error) => {
        const msg = error.error.msg || 'No se ha agregado correctamente, vuelva a intentarlo';
        const alertMal = await this.alertController.create({
          header: 'Error',
          subHeader: msg,
          buttons: [{text: 'Aceptar', cssClass: 'botonOKModal',}],
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

  cancelarModalAgregar() {
    this.formAgregar.reset();
    this.formAgregar.controls['estado'].setValue('Apagado');
    this.modalAgregar?.dismiss(null, 'cancel');
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
