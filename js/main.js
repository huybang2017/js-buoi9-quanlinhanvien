// tạo mảng
let employeeList = [];
// Hàm thêm nhân viên
function createEmployee() {
    let account = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let dateOfWork = getElement("#datepicker").value;
    let salary = +getElement("#luongCB").value;
    let competence = getElement("#chucvu").value;
    let timeWork = +getElement("#gioLam").value;

    const employee = new Employee(
        account,
        name,
        email,
        password,
        dateOfWork,
        salary,
        competence,
        timeWork,
    );
    employeeList.push(employee);
    renderTable(employeeList);
}
// Hàm tìm kiếm nhân viên theo xếp loại 
function searchEmployee() {
    let search = getElement("#searchName").value;
    let newEmployeeList = employeeList.filter((employee) => {
        let xepLoai = employee.classification().toLowerCase();
        search = search.toLowerCase();

        return xepLoai.indexOf(search) !== -1;
    });

    renderTable(newEmployeeList);
}
// Hàm xoá nhân viên theo account
function deleteEmployee(employeeAccount) {
    employeeList = employeeList.filter((employee) => {
        return employee.account !== employeeAccount;
    });

    renderTable(employeeList);
}
// Hàm tìm nhân viên theo account fill lên form
function fixEmployee(employeeAccount){
    let selectedEmployee = employeeList.find((employee) => {
        return employee.account === employeeAccount;
    });

    getElement("#tknv").value = selectedEmployee.account;
    getElement("#name").value = selectedEmployee.name;
    getElement("#email").value = selectedEmployee.email;
    getElement("#password").value = selectedEmployee.password;
    getElement("#datepicker").value = selectedEmployee.dateOfWork;
    getElement("#luongCB").value = selectedEmployee.salary;
    getElement("#chucvu").value = selectedEmployee.competence;
    getElement("#gioLam").value = selectedEmployee.timeWork;

    getElement("#tknv").disabled = true;
    getElement("#btnThemNV").disabled = true;
}
// Hàm cập nhật thông tin nhân viên
function updateEmployee(){
    let account = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let dateOfWork = getElement("#datepicker").value;
    let salary = +getElement("#luongCB").value;
    let competence = getElement("#chucvu").value;
    let timeWork = +getElement("#gioLam").value;

    const employee = new Employee(
        account,
        name,
        email,
        password,
        dateOfWork,
        salary,
        competence,
        timeWork,
    )

    let index = employeeList.findIndex((employee) => {
        return employee.account === account;
    });
    employeeList[index] = employee;

    renderTable(employeeList);
    resetForm();
}
// Hàm reset giá trị của các input
function resetForm(){
    getElement("#tknv").value = "";
    getElement("#name").value = "";
    getElement("#email").value = "";
    getElement("#password").value = "";
    getElement("#datepicker").value = "";
    getElement("#luongCB").value = "";
    getElement("#chucvu").value = "";
    getElement("#gioLam").value = "";

    getElement("#tknv").disabled = false;
    getElement("#btnThemNV").disabled = false;
}
// Hàm hiển thị nhân viên
function renderTable(employeeList) {
    let html = employeeList.reduce((output, employee) => {
        return (
            output + `
                <tr>
                    <td>${employee.account}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.dateOfWork}</td>
                    <td>${employee.competence}</td>
                    <td>${employee.calcSalary()}</td>
                    <td>${employee.classification()}</td>
                    <td>
                        <button
                        class="btn btn-primary"
                        onclick="deleteEmployee('${employee.account}')"
                        >
                            xoá
                        </button
                        >
                        <button
                        class="btn btn-danger"
                        onclick="fixEmployee('${employee.account}')"
                        >
                            chỉnh sửa
                        </button>
                    </td>
                </tr>
            `
        )
    }, "")
    getElement("#tableDanhSach").innerHTML = html;
}

function getElement(selector) {
    return document.querySelector(selector);
}