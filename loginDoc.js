const doctorBtn = document.getElementById(`doctor`)
const patientBtn = document.getElementById(`patient`)
const overLay = document.getElementById(`overlay`)

const email = document.getElementById(`email`)
const password = document.getElementById(`password`)
const loginBtn = document.getElementById(`loginBtn`)

patientBtn.addEventListener(`click`, () => {
    doctorBtn.classList.add(`remove`)
    patientBtn.classList.add(`active`)
    overLay.classList.add(`active`)

    setTimeout(() => {
        window.location.href = './login.html';
    }, 500);
});

let users = JSON.parse(localStorage.getItem("userReg"))

loginBtn.addEventListener(`click`, () => {

    let doctor = users.find(user => user.role === "doctor" && user.email === email.value)

    console.log(doctor);


    if (doctor && doctor.password === password.value) {

        email.value = ''
        password.value = ''

        alert(`Успешный вход! Добро пожаловать ${doctor.names}`)

    } else if (!doctor) {
        alert(`Пользователь не найден!`)

        email.value = ''
        password.value = ''
    } else if (password.value !== doctor.password) {
        alert(`Неверный пароль!`)
    }

})