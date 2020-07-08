import { Sexe } from '../../utils/enums/sexe.enum';
import { BaseEntity } from './base.entity';

export class Client extends BaseEntity {
  nom: string;
  prenom: string;
  sexe: Sexe;
  photosrc: string;
  telephone: number;
  adresse: string;
}
