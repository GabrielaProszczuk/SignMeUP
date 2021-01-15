import { FieldOfStudy } from './field_of_study';

export class Subject{
    field_of_study: FieldOfStudy;
    name: string;
    description: string;
    lecturer: string;
    type: string;
    start_time: Date;
    end_time: Date;

    constructor(  field_of_study: FieldOfStudy, name: string, description: string, lecturer: string, type: string, start_time: Date, end_time: Date){
        this.field_of_study = field_of_study;
        this.name = name;
        this.description = description;
        this.lecturer = lecturer;
        this.type = type;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}
   