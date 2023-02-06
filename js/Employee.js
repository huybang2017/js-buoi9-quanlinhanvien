function Employee(
    account,
    name,
    email,
    password,
    dateOfWork,
    salary,
    competence,
    timeWork
) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dateOfWork = dateOfWork;
    this.salary = salary;
    this.competence = competence;
    this.timeWork = timeWork;
}
Employee.prototype.calcSalary = function(){
    if(this.competence === "Sếp"){
        return this.salary * 3 * this.timeWork;
    }else if(this.competence === "Trưởng phòng"){
        return this.salary * 2 * this.timeWork;
    }else{
        return this.salary * this.timeWork;
    }
}

Employee.prototype.classification = function(){
    if(this.timeWork >= 192){
        return "nhân viên xuất xắc";
    }else if(this.timeWork >= 176 && this.timeWork < 192){
        return "nhân viên giỏi";
    }else if(this.timeWork >= 160 && this.timeWork < 176){
        return "nhân viên khá";
    }else{
        return "nhân viên trung bình";
    }
}