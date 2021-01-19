import { User } from "./app/models/user"

export type UniversityAdmin = {
    user: User;
}

export type University = {
    university_admin: string,
    name: string;
}

export type Department = {
    university: University,
    university_Admin: UniversityAdmin,
    name: string;
}

export type Query = {
    allDepartments: Department[];
}

export type Token = {
    token: string;
    user: User;
}