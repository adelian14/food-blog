export class Validation{
    constructor(){
        this.agePattern = /^(?:1[8-9]|[2-9]\d)$/;
        this.emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.namePattern = /^[a-zA-Z\s]{1,50}$/;
        this.passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        this.phonePattern = /^\+?\d{8,15}$/;
    }
    matchPhone(s){
        return this.phonePattern.test(s);
    }
    matchEmail(s){
        return this.emailPattern.test(s);
    }
    matchName(s){
        return this.namePattern.test(s);
    }
    matchPassword(s){
        return this.passwordPattern.test(s);
    }
    matchAge(s){
        return this.agePattern.test(s);
    }
    comparePasswords(s,t){
        return s==t;
    }
}