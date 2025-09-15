let namesInput = document.getElementById(`name`)
let emailInput = document.getElementById(`email`)
let passwordInput = document.getElementById(`password`)
let passwordConfirm = document.getElementById(`confirm`)

const privacy = document.querySelector(`.privacy`)

let registerBtn = document.getElementById(`register`)
let privacybtn = document.getElementById(`privacyBtn`)

let userReg = []


let logUsers = {
    names: "Alex",
    email: "alex@gmail.com",
    password: "alex123",
    role: "patient"
}

let logDoctor = {
    names: "Dr.Johny Sins",
    email: "DrJohn@gmail.com",
    password: "John123",
    role: "doctor"
}

userReg.push(logUsers)
userReg.push(logDoctor)

localStorage.setItem("userReg", JSON.stringify(userReg))



function validatePasswords() {
    if (passwordInput.value && passwordConfirm.value) {
        if (passwordInput.value === passwordConfirm.value) {
            passwordInput.style.border = `1px solid green`;
            passwordConfirm.style.border = `1px solid green`;
        } else {
            passwordInput.style.border = `1px solid red`;
            passwordConfirm.style.border = `1px solid red`;
        }
    } else {
        passwordInput.style.border = `1px solid #E7E8EB`;
        passwordConfirm.style.border = `1px solid #E7E8EB`;
    }
}

passwordConfirm.addEventListener(`input`, validatePasswords)
passwordInput.addEventListener(`input`, validatePasswords)

privacybtn.addEventListener(`click`, () => {

    if (privacybtn.classList.contains(`active`)) {

        privacybtn.classList.remove(`active`)
        privacybtn.style.border = `1px solid #E7E8EB`


    } else {
        privacybtn.classList.add(`active`)
        privacybtn.style.border = `none`
        privacybtn.innerHTML = `<svg class="privacy_svg " width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.625 3.50065L3.54167 6.41732L9.375 0.583984" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
    }
});


registerBtn.addEventListener(`click`, () => {

    let regUsers = JSON.parse(localStorage.getItem(`userReg`)) || []


    let nameValue = namesInput.value
    let emailValue = emailInput.value
    let passwordValue = passwordInput.value
    let passwordConfirmValue = passwordConfirm.value

    userReg.forEach(user => {
        if (emailInput.value === user.email) {

            alert(`Этот mail уже зарегестрирован!`)

        }
    })

    if (namesInput.value === "" || emailInput.value === "" || passwordInput.value === "" || passwordConfirm.value === "") {

        alert(`Заполните все поля`)

    } else if (passwordInput.value === passwordConfirm.value && privacybtn.classList.contains(`active`)) {


        let newUser = {
            names: nameValue,
            email: emailValue,
            password: passwordValue,
            role: "patient"
        }

        regUsers.push(newUser)


        localStorage.setItem("userReg", JSON.stringify(regUsers));

        console.log(`Сохранено`);
        console.table(regUsers)

        namesInput.value = ``
        emailInput.value = ``
        passwordInput.value = ``
        passwordConfirm.value = ''

        validatePasswords()

    } else if (!privacybtn.classList.contains(`active`)) {

        privacybtn.style.border = `1px solid red`

        console.log(`Несохранено`);

    }
});