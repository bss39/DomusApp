import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
})
export class GestionUsuariosPage implements OnInit {

  @ViewChild('modalAgregar') modalAgregar: IonModal | undefined;
  @ViewChild('modalBuscar') modalBuscar: IonModal | undefined;
  @ViewChild('modalEditar') modalEditar: IonModal | undefined;

  public abrirModalEditar: boolean = false;

  public textoBusq: string = "";
  public usuarios: Usuario[] = [];
  public usuarioSelec!: Usuario;

  public formAgregar: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    pin:['', Validators.required]
  });

  public formEditar: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    pin:['', Validators.required]
  });

  public formBuscar: FormGroup = this.formBuilder.group({
    texto: ['']
  });

  constructor(private router: Router,
              private alertController: AlertController,
              private usuarioService: UsuarioService,
              private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.mostrarUsuarios();
  }

  mostrarUsuarios(){
    this.usuarioService.obtenerUsuarios(this.textoBusq).subscribe((res: any) => {
      this.usuarios = res['usuarios'][0];
    });
  }


  abrirModalEditarUsuario(usuario: Usuario){
    this.abrirModalEditar = true;
    this.usuarioSelec = usuario;

    this.formEditar.get('nombre')?.setValue(this.usuarioSelec?.nombre);
    this.formEditar.get('pin')?.setValue(this.usuarioSelec?.pin);
  }


  async busqueda(){

    if(!this.formBuscar.value.texto) this.formBuscar.get('texto')?.setValue("");

    this.usuarioService.obtenerUsuarios(this.formBuscar.value.texto).subscribe(async (res: any) => {
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

  async agregarUsuario(){

    if(this.formAgregar.valid){
      this.usuarioService.agregarUsuario(this.formAgregar.value).subscribe(async (res: any) => {
        this.formAgregar.reset();
        this.modalAgregar?.dismiss(null, 'cancel');
        this.ngOnInit();

        const alertBien = await this.alertController.create({
          header: 'El usuario '+res['usuario'].nombre+' se ha agregado correctamente',
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
    this.modalAgregar?.dismiss(null, 'cancel');
  }

  async editarUsuario(){

    if(this.formEditar.valid){
      this.usuarioService.editarUsuario(this.usuarioSelec?.id,this.formEditar.value).subscribe(async (res: any) => {
        this.formEditar.reset();
        this.modalEditar?.dismiss(null, 'cancel');
        this.abrirModalEditar = false;
        this.ngOnInit();

        const alertBien = await this.alertController.create({
          header: 'El usuario '+res['usuarioActualizado'].nombre+' se ha actualizado correctamente',
          buttons: [{text: 'Aceptar', cssClass: 'botonOKModal'}],
          cssClass: 'modal',
          backdropDismiss: false
        });
        await alertBien.present();

      }, async (error) => {
        const msg = error.error.msg || 'No se ha actualizado correctamente, vuelva a intentarlo';
        const alertMal = await this.alertController.create({
          header: 'Error',
          subHeader: 'Ha ocurrido un error actualizando el usuario',
          message: msg,
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

  async eliminarUsuario(usuario: Usuario){
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar el usuario '+usuario?.nombre+'?',
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
            this.usuarioService.eliminarUsuario(usuario.id).subscribe((res: any) => {
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
