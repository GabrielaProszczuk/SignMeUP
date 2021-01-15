import {Year} from './year';

export class FieldOfStudy{
    name: string;
    year: Year;

    constructor(name: string, year: Year){
        this.name = name;
        this.year = year;
    }
}
