const emailLogin = document.getElementById('emailInput')
const passwordLogin = document.getElementById('passwordInput')
const loginBtn = document.getElementById('loginFormBtn')

const doctorBtn = document.getElementById(`doctor`)
const patientBtn = document.getElementById(`patient`)
const overLay = document.getElementById(`overlay`)

function checkEmail() {
    users.forEach(user => {

        if (emailLogin.value === user.email) {

            emailLogin.style.border = `1px solid green`

        } else if (emailLogin.value !== user.email) {
            emailLogin.style.border = `1px solid red`
        } else if (emailLogin.value === "") {
            emailLogin.style.border = `1px solid #E7E8EB`
        }

        console.log(user);

    });

}

function checkPassword() {

    users.forEach(user => {
        if (passwordLogin.value === user.password) {
            passwordLogin.style.border = `1px solid green`
        } else if (passwordLogin.value !== user.password) {
            passwordLogin.style.border = `1px solid red`
        }
    })

}

let users = JSON.parse(localStorage.getItem("userReg"))

loginBtn.addEventListener(`click`, () => {

    users.forEach(user => {

        if (emailLogin.value.trim() === user.email && passwordLogin.value.trim() === user.password) {

            // window.location.href = ``

            alert(`Успешный вход`)



        } else if (emailLogin.value !== user.email) {
            emailLogin.style.border = `1px solid red`
        } else if (passwordLogin.value !== user.password) {
            passwordLogin.style.border = `1px solid red`
        }

    })

})

emailLogin.addEventListener(`input`, () => {

    users.forEach(user => {
        if (emailLogin.value === user.email) {
            emailLogin.style.border = `1px solid #E7E8EB`
        }

    })
})

passwordLogin.addEventListener(`input`, () => {

    users.forEach(user => {
        if (passwordLogin.value === user.password) {
            passwordLogin.style.border = `1px solid #E7E8EB`
        }

    })
})


doctorBtn.addEventListener(`click`, () => {
    doctorBtn.classList.add(`active`)
    patientBtn.classList.add(`remove`)
    overLay.classList.add(`active`)

    setTimeout(() => {
        window.location.href = './loginDoc.html';
    }, 500);


});
