import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InterfaceSubject, LevelInterface, LevelSubjectInterface } from './level';
import { SubjectService } from 'src/subject/subject.service';
import { LEVELS } from './bdd';
import { BddService } from 'src/bdd/bdd.service';

@Injectable()
export class LevelService {
  constructor(@Inject(forwardRef(() => SubjectService))
              private readonly _subjectService: SubjectService, 
              private bdd: BddService) {}
  findAll(): LevelInterface[] {
      return this.bdd.get('levels');
    }
  findLevelAndSubjectByName(name: string): LevelSubjectInterface[] {
    const level = this.findAll().find((l) => l.name === name);
    if (!level) {
      throw new Error(`Level ${name} not found`);
    }
    const subjects = this._subjectService.findAll();
    return subjects.filter((s) => s.levelId === level.id).map((subject) => ({ subject, level }));

  }
}
