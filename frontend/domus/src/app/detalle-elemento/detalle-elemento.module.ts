import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleElementoPageRoutingModule } from './detalle-elemento-routing.module';

import { DetalleElementoPage } from './detalle-elemento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleElementoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetalleElementoPage]
})
export class DetalleElementoPageModule {}
