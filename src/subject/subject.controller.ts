import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SUBJECTS } from './bdd';
import { InterfacePostSubject, InterfaceSubject } from './subject';
import { SubjectService } from './subject.service';
import { LevelSubjectInterface } from 'src/level/level';

@Controller('subject')
export class SubjectController {
    constructor(private readonly _subjectService: SubjectService){

    }
    @Get()
    findAll(): InterfaceSubject[] {
        return SUBJECTS;
    }

    @Get(':id')
    findById(@Param('id') id: string): InterfaceSubject {
        return this._subjectService.findoneById(+id);
    }

    @Get(':name/level')
    findLevelAndSubject(@Param('name') name: string): LevelSubjectInterface[] {
        return this._subjectService.levelAndSubjectFromName(name);
    }

    @Post()
    addSubject(@Body() subject: InterfacePostSubject): InterfaceSubject[] {
        return this._subjectService.createNewSubject(subject);
    }
}

