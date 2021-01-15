import { Student } from "./student";
import { Subject } from "./subject"

export class Points{
    subject: Subject;
    student: Student;
    points: Number;

    constructor(subject: Subject, student: Student, points: Number){
        this.subject = subject;
        this.student = student;
        this.points = points;
    }
}