import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuSeccionesPageRoutingModule } from './menu-secciones-routing.module';

import { MenuSeccionesPage } from './menu-secciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuSeccionesPageRoutingModule
  ],
  declarations: [MenuSeccionesPage]
})
export class MenuSeccionesPageModule {}
