export interface Usuario {
  id?: number;
  tipo_usuario: string;
  nome: string;
  email: string;
  senha: string;
  status?: boolean;
  createdAt?: Date;
  fotoPerfilUrl?: string;
  updatedAt?: Date;
}
