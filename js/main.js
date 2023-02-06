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
// Hàm tìm kiếm nhân viên theo tên
function searchEmployee() {
    let search = getElement("#searchName").value;
    let newEmployeeList = employeeList.filter((employee) => {
        let name = employee.name.toLowerCase();
        search = search.toLowerCase();

        return name.indexOf(search) !== -1;
    });

    renderTable(newEmployeeList);
}
// Hàm xoá nhân viên theo id
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