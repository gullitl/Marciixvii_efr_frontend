import { BaseEntity } from './base.entity';
import { Client } from './client.entity';

export class Fiche extends BaseEntity {
  client: Client;
}
