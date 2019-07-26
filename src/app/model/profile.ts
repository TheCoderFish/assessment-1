export class Profile {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public gender: Gender,
        public hobbies: hobby[],
        public birthDate: Date,
        public salary: number,
        public city: string
    ) { }
}

export enum Gender { Male, Female }
// tslint:disable-next-line: class-name
export interface hobby {
    name: string;
    selected: boolean;
}