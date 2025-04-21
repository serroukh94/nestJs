import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InterfacePostSubject, InterfaceSubject } from './subject';
import { SUBJECTS } from './bdd';
import { BddService } from 'src/bdd/bdd.service';
import { LevelSubjectInterface } from 'src/level/level';
import { LevelService } from 'src/level/level.service';

@Injectable()
export class SubjectService {
  constructor(private bdd: BddService,
              @Inject(forwardRef(() => LevelService))
              private _levelService: LevelService){}
  findAll(): InterfaceSubject[] {
    return this.bdd.get('subjects');
  }

  findoneById(id: number): InterfaceSubject {
    const subject = this.bdd.getById('subjects', id);
    if (!subject)
      throw new NotFoundException(`subject with ID ${id} not found`);
    return subject;
  }

  createNewSubject({ name }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubject = this.findAll().sort((a, b) => a.id - b.id);
    const newId = sortedByIdSubject[sortedByIdSubject.length - 1].id + 1;
    return [...SUBJECTS, { id: newId, name, levelId : 1 }];
  }

  levelAndSubjectFromName(name: string): LevelSubjectInterface[] {
    const subject = this.findAll().find((s) => s.name === name);
    if(!subject){
      throw new NotFoundException(`subject with name ${name} not found`);
    }
    const levels = this._levelService.findAll();
    const filteredLevel = levels.filter((l) => l.id === subject.levelId);
    return filteredLevel.map((level) => ({ 
      level,
      subject
    }))
  }
}
