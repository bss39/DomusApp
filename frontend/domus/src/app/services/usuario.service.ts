import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario!: Usuario;

  constructor(private http: HttpClient,
              private router: Router) { }

  obtenerUsuario(id: number){
    return this.http.get(`http://localhost:3000/api/usuarios/${id}`);
  }

  obtenerUsuarios(nombre: string){
    return this.http.get(`http://localhost:3000/api/usuarios?nombre=${nombre}`);
  }

  agregarUsuario(body: any){
    return this.http.post(`http://localhost:3000/api/usuarios`, body);
  }

  editarUsuario(id: number, body: any){
    return this.http.put(`http://localhost:3000/api/usuarios/${id}`, body);
  }

  eliminarUsuario(id: number){
    return this.http.delete(`http://localhost:3000/api/usuarios/${id}`);
  }
}
