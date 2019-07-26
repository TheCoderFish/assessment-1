export class Profile {
    constructor(
        public firstName: string,
        public lastName: string,
        public gender: Gender,
        public hobbies: hobby[],
        public birthDate: Date,
        public salary: number,
        public city: string
    ) { }
}

enum Gender { Male, Female }
// tslint:disable-next-line: class-name
interface hobby {
    name: string;
    selected: boolean;
}