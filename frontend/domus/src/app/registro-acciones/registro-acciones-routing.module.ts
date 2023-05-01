import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAccionesPage } from './registro-acciones.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAccionesPageRoutingModule {}
