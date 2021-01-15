export class User{
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    groups: number;
    university: number;

    constructor(first_name: string, last_name: string, username: string, password: string, email: string, groups: number, university: number) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.username=username;
        this.password=password;
        this.email = email;
        this.groups = groups; 
        this.university = university;
     }

}