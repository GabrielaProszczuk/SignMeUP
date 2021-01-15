import { Student } from "./student";
import { Subject } from './subject';

export class SubjectGroup{
    subject: Subject;
    student: Student;

    constructor(subject: Subject, student: Student){
        this.subject = subject;
        this.student = student;
    }
}