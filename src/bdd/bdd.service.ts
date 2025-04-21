import { Injectable } from '@nestjs/common';
import bdd from './bdd';

@Injectable()
export class BddService {
  get<K extends keyof typeof bdd>(key: K): (typeof bdd)[K] {
    return bdd[key];
  }

  getById<K extends keyof typeof bdd>(
    key: K,
    id: number,
  ): (typeof bdd)[K][number] | undefined {
    return bdd[key].find((entity) => entity.id === id);
  }
}
