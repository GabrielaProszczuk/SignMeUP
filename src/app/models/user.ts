export class User{
    password: string;
    email: string;
    username: string;
    groups: number;
    university: number;
    department: number;
    is_staff: boolean;
    is_active: boolean;


    constructor(password: string, username: string, email: string, groups: number, department: number, university: number) {
        this.password=password;
        this.email = email;
        this.username = username;
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