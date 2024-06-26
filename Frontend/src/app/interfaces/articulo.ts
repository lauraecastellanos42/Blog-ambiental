export interface ParrafoDTO {
  id: number;
  cuerpo: string;
  articuloId: number;
}

export interface TematicaDTO {
  id: number;
  nombre: string;
}

export interface TipoDTO {
  id: number;
  nombre: string;
}

export interface ImagenDTO {
  id: number;
  mime: string;
  name: string;
  contenido: string;
  articuloId: number;
}

export interface Articulo {
  id?: number;
  fecha: string;
  is_aprobado: boolean;
  titulo: string;
  usuarioId: number;
  parrafosDTO?: ParrafoDTO[];
  tematicasDTO?: TematicaDTO[];
  tiposDTO?: TipoDTO[];
  imagenesDTO?: ImagenDTO[];
}
