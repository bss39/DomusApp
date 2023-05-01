import { Usuario } from './usuario.model';
import { Elemento } from './elemento.model';

export class Accion {

  constructor(
    public id: number,
    public descripcion: string,
    public fecha: string,
    public hora: string,
    public usuario_id: number,
    public elemento_id: number,
    ) {}
}
