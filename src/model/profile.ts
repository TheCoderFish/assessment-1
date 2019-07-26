export class Profile {
    constructor(
        public firstName: string,
        public lastName: string,
        public gender: Gender,
        public hobbies: string[],
        public birthDate: Date,
        public salary: number,
        public city: string
    ) { }
}

enum Gender { Male, Female };