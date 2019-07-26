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
export interface hobby {
    name: string;
    selected: boolean;
}