export class User{
    id: number;
    password: string;
    email: string;
    groups: number;
    university: number;
    department: number;
    is_staff: boolean;
    is_active: boolean;
    date_joined: Date;


    constructor(password: string, email: string, groups: number, department: number, university: number) {
        this.password=password;
        this.email = email;
        this.groups = groups; 
        this.department = department;
        this.university = university;
        this.is_active = true;
        if(groups==2 || groups==1){
            this.is_staff = true;
        }else{
            this.is_staff = false;
        }
       
     }

}