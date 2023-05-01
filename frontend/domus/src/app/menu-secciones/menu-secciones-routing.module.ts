import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuSeccionesPage } from './menu-secciones.page';

const routes: Routes = [
  {
    path: '',
    component: MenuSeccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSeccionesPageRoutingModule {}
