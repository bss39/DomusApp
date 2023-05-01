import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleElementoPage } from './detalle-elemento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleElementoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleElementoPageRoutingModule {}
