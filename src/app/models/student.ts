import { User } from "./user";

import { FieldOfStudy } from './field_of_study';
export class Student{
    user: User;
    field_of_study:FieldOfStudy;

    constructor(user: User, field_of_study: FieldOfStudy) {
        this.user = user;
        this.field_of_study = field_of_study;
     
     }
}