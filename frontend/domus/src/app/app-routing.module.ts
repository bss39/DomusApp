import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'panel-control',
    loadChildren: () => import('./panel-control/panel-control.module').then( m => m.PanelControlPageModule)
  },
  {
    path: 'panel-control/detalle-elemento/:id',
    loadChildren: () => import('./detalle-elemento/detalle-elemento.module').then( m => m.DetalleElementoPageModule)
  },
  {
    path: 'menu-secciones',
    loadChildren: () => import('./menu-secciones/menu-secciones.module').then( m => m.MenuSeccionesPageModule)
  },
  {
    path: 'plano',
    loadChildren: () => import('./plano/plano.module').then( m => m.PlanoPageModule)
  },
  {
    path: 'registro-acciones',
    loadChildren: () => import('./registro-acciones/registro-acciones.module').then( m => m.RegistroAccionesPageModule)
  },
  {
    path: 'gestion-usuarios',
    loadChildren: () => import('./gestion-usuarios/gestion-usuarios.module').then( m => m.GestionUsuariosPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
