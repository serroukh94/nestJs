import { Controller, Get, Param } from '@nestjs/common';
import { LevelSubjectInterface } from './level';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {

    constructor(private readonly _levelService: LevelService){

    }
    @Get('subject/:name')
    findLevelAndSubjectByName(@Param('name') name: string): LevelSubjectInterface[] {
        return this._levelService.findLevelAndSubjectByName(name);
    }

}
