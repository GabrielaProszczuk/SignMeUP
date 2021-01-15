import { Student } from "./student";
import { Subject } from "./subject"

export class Application{
    unwanted_subject: Subject;
    wanted_subject: Subject;
    student: Student;
    priority: Number;
    created_at: Date;

    constructor( unwanted_subject: Subject, wanted_subject: Subject, student: Student, priority: Number, created_at: Date){
        this.unwanted_subject = unwanted_subject;
        this.wanted_subject = wanted_subject;
        this.student = student;
        this.priority = priority;
        this.created_at = created_at;
    }
}