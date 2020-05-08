import { Sexe } from '../../utils/enums/sexe.enum';
import { BaseEntity } from './base.entity';
import { NiveauAcces } from '@shared/utils/enums/niveau-acces.enum';

export class Utilisateur extends BaseEntity {
  nom: string;
  postnom: string;
  prenom: string;
  sexe: Sexe;
  photosrc: string;
  email: string;
  username: string;
  password: string;
  niveauAcces: NiveauAcces;
}
