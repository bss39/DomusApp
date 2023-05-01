import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelControlPage } from './panel-control.page';

import { PanelControlPageRoutingModule } from './panel-control-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelControlPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PanelControlPage]
})
export class PanelControlPageModule {}
