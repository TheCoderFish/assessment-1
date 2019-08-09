export class Profile {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public gender: Gender,
        public hobbies: Hobby[],
        public birthDate: Date,
        public salary: number,
        public city: string
    ) { }
}

export enum Gender { Male, Female }

export interface Hobby {
    name: string;
    selected: boolean;
}

export interface City {
    id: number;
    name: string;
}
