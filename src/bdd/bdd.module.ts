import { Global, Module } from '@nestjs/common';
import { BddService } from './bdd.service';

@Global()
@Module({
    providers: [BddService, {
        provide: 'levels',
        useValue:
    }],
    exports: [BddService]
})
export class BddModule {}
