import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccionService {

  constructor(private http: HttpClient) { }

  obtenerAcciones(texto: string){
    return this.http.get(`http://localhost:3000/api/acciones?texto=${texto}`);
  }

  eliminarAccion(id: number){
    return this.http.delete(`http://localhost:3000/api/acciones/${id}`);
  }

  agregarAccion(body: Data){
    return this.http.post(`http://localhost:3000/api/acciones`, body);
  }
}
