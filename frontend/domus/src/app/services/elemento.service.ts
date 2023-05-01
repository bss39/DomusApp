import { Injectable } from '@angular/core';
import { Elemento } from '../models/elemento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {

  private elemento!: Elemento;

  private token: String = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4NzQ4NmNmMzc2NWE0NGQ1ODgyMWUzMGZiMGU3YTJjZCIsImlhdCI6MTY3OTUxMDYzMiwiZXhwIjoxOTk0ODcwNjMyfQ.yffWyhKGcXGQhrFDLOuf6xcE-NaX0QJgVGpxNysieYE';
  private token2: String = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4ZGJiNGUxYmRiMzM0ODYyYmVmNjAyZjVjY2FiOGU3NCIsImlhdCI6MTY4MDcxNjUzMCwiZXhwIjoxOTk2MDc2NTMwfQ.c77QbgUKqyDvrEzdIxiSDqRp7a65nObVMG6JczRHKQE';

  constructor(private http: HttpClient,
              private router: Router) { }

  obtenerElemento(id: number){
    return this.http.get(`http://localhost:3000/api/elementos/${id}`);
  }

  obtenerElementos(texto: string){
    return this.http.get(`http://localhost:3000/api/elementos?texto=${texto}`);
  }

  agregarElemento(body: Data){
    return this.http.post(`http://localhost:3000/api/elementos`, body);
  }

  editarElemento(id: number, body: Data){
    return this.http.put(`http://localhost:3000/api/elementos/${id}`, body);
  }

  eliminarElemento(id: number){
    return this.http.delete(`http://localhost:3000/api/elementos/${id}`);
  }

  encender(eleData: Data){
    let body = {
      "entity_id": eleData["elemento"]
    }

    return this.http.post(`http://homeassistant.local:8123/api/services/` + eleData["tipo"] + `/turn_on`,
                            body, {headers: this.cabeceras});
  }

  apagar(eleData: Data){
    let body = {
      "entity_id": eleData["elemento"]
    }

    return this.http.post(`http://homeassistant.local:8123/api/services/` + eleData["tipo"] + `/turn_off`,
                            body, {headers: this.cabeceras});
  }

  play(eleData: Data){
    let body = {
      "entity_id": eleData["elemento"],
      "media_content_id": "http://playerservices.streamtheworld.com/api/livestream-redirect/CADENASER.mp3",
      "media_content_type": "music",
      "announce": true
    }

    return this.http.post(`http://homeassistant.local:8123/api/services/` + eleData["tipo"] + `/play_media`,
                            body, {headers: this.cabeceras});
  }

  get cabeceras(){

    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token2}`);

    return headers;
  }
}
