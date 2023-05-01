import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelControlPage } from './panel-control.page';

const routes: Routes = [
  {
    path: '',
    component: PanelControlPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelControlPageRoutingModule {}
