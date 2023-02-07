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

    getElement("#tbTKNV").style.display = "none";
    getElement("#tbTen").style.display = "none";
    getElement("#tbEmail").style.display = "none";
    getElement("#tbMatKhau").style.display = "none";
    getElement("#tbNgay").style.display = "none";
    getElement("#tbLuongCB").style.display = "none";
    getElement("#tbChucVu").style.display = "none";
    getElement("#tbGiolam").style.display = "none";

    let isValid = validate();
    if (!isValid) {
        return;
    }
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
function fixEmployee(employeeAccount) {
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
function updateEmployee() {
    let account = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let dateOfWork = getElement("#datepicker").value;
    let salary = +getElement("#luongCB").value;
    let competence = getElement("#chucvu").value;
    let timeWork = +getElement("#gioLam").value;

    getElement("#tbTKNV").style.display = "none";
    getElement("#tbTen").style.display = "none";
    getElement("#tbEmail").style.display = "none";
    getElement("#tbMatKhau").style.display = "none";
    getElement("#tbNgay").style.display = "none";
    getElement("#tbLuongCB").style.display = "none";
    getElement("#tbChucVu").style.display = "none";
    getElement("#tbGiolam").style.display = "none";

    let isValid = validate();
    if (!isValid) {
        return;
    }

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
function resetForm() {
    getElement("#tknv").value = "";
    getElement("#name").value = "";
    getElement("#email").value = "";
    getElement("#password").value = "";
    getElement("#datepicker").value = "";
    getElement("#luongCB").value = "";
    getElement("#chucvu").value = "";
    getElement("#gioLam").value = "";

    getElement("#tbTKNV").style.display = "none";
    getElement("#tbTen").style.display = "none";
    getElement("#tbEmail").style.display = "none";
    getElement("#tbMatKhau").style.display = "none";
    getElement("#tbNgay").style.display = "none";
    getElement("#tbLuongCB").style.display = "none";
    getElement("#tbChucVu").style.display = "none";
    getElement("#tbGiolam").style.display = "none";

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

function validate() {
    let isValid = true;
    let account = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let dateOfWork = getElement("#datepicker").value;
    let salary = getElement("#luongCB").value;
    let competence = getElement("#chucvu").value;
    let timeWork = getElement("#gioLam").value;

    // getElement("#tbTKNV").style.display = "block";
    // getElement("#tbTen").style.display = "block";
    // getElement("#tbEmail").style.display = "block";
    // getElement("#tbMatKhau").style.display = "block";
    // getElement("#tbNgay").style.display = "block";
    // getElement("#tbLuongCB").style.display = "block";
    // getElement("#tbChucVu").style.display = "block";
    // getElement("#tbGiolam").style.display = "block";
    // kiểm tra account
    if (!account.trim()) {
        isValid = false;
        getElement("#tbTKNV").innerHTML = `không được để trống`;
        getElement("#tbTKNV").style.display = "block";
    }else if(!/^[a-zA-Z0-9]{4,6}$/.test(account)){
        isValid = false;
        getElement("#tbTKNV").innerHTML = `không hợp lệ`;
        getElement("#tbTKNV").style.display = "block";
    }

    // kiểm tra họ và tên
    if (!name.trim()) {
        isValid = false;
        getElement("#tbTen").innerHTML = `không được để trống`;
        getElement("#tbTen").style.display = "block";
    }else if(!/^[a-zA-Z\s]{1,}$/.test(name)){
        isValid = false;
        getElement("#tbTen").innerHTML = `không hợp lệ`;
        getElement("#tbTen").style.display = "block";
    }
    // kiểm tra email
    if (!email.trim()) {
        isValid = false;
        getElement("#tbEmail").innerHTML = `không được để trống`;
        getElement("#tbEmail").style.display = "block";
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        isValid = false;
        getElement("#tbEmail").innerHTML = `không hợp lệ`;
        getElement("#tbEmail").style.display = "block";
    }
    // kiểm tra mật khẩu
    if (!password.trim()) {
        isValid = false;
        getElement("#tbMatKhau").innerHTML = `không được để trống`;
        getElement("#tbMatKhau").style.display = "block";
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/.test(password)) {
        isValid = false;
        getElement("#tbMatKhau").innerHTML = `không hợp lệ`;
        getElement("#tbMatKhau").style.display = "block";
    }
    // kiểm tra ngày
    if (!dateOfWork.trim()) {
        isValid = false;
        getElement("#tbNgay").innerHTML = `không được để trống`;
        getElement("#tbNgay").style.display = "block";
    }
    // kiểm tra lương CB
    if (!salary.trim()) {
        isValid = false;
        getElement("#tbLuongCB").innerHTML = `không được để trống`;
        getElement("#tbLuongCB").style.display = "block";
    }
    // kiểm tra chức vụ
    if (!competence.trim()) {
        isValid = false;
        getElement("#tbChucVu").innerHTML = `chọn chức vụ`;
        getElement("#tbChucVu").style.display = "block";
    }
    // kiểm tra giờ làm
    if (!timeWork.trim()) {
        isValid = false;
        getElement("#tbGiolam").innerHTML = `không được để trống`;
        getElement("#tbGiolam").style.display = "block";
    }
    return isValid;
}