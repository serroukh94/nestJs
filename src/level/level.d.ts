export type LevelInterface = {
    id: number;
    name: string
}

export type InterfaceSubject = {
    id: number;
    name: string;
    levelId: number;
}

export type LevelSubjectInterface = {
    level: LevelInterface;
    subject: InterfaceSubject
}