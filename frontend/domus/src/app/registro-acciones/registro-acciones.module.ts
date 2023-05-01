import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAccionesPageRoutingModule } from './registro-acciones-routing.module';

import { RegistroAccionesPage } from './registro-acciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAccionesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroAccionesPage]
})
export class RegistroAccionesPageModule {}
