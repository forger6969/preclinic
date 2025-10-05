const emailLogin = document.getElementById('emailInput')
const passwordLogin = document.getElementById('passwordInput')
const loginBtn = document.getElementById('loginFormBtn')

const doctorBtn = document.getElementById(`doctor`)
const patientBtn = document.getElementById(`patient`)
const overLay = document.getElementById(`overlay`)

let users = JSON.parse(localStorage.getItem("userReg"))




console.log(users);


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

function showNotification(message, color, duration = 3000) {


    const notification = document.getElementById("notification");
    const text = document.getElementById("notificationText");
    const progressBar = document.getElementById("progressBar");

    text.textContent = message;
    notification.classList.add("show");
    progressBar.style.width = "0%";
    notification.style.backgroundColor = color

    setTimeout(() => {
        progressBar.style.transition = `width ${duration}ms linear`;
        progressBar.style.width = "100%";
    }, 10);

    // Скрываем уведомление
    setTimeout(() => {
        notification.classList.remove("show");
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";
    }, duration);
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


loginBtn.addEventListener(`click`, () => {

    const userAll = users.filter(u => u.role === "patient")
    const user = users.find(u => u.email === emailLogin.value.trim());
    console.log('Пациенты', userAll);


    console.log("CurrentUser", user);


    userAll.forEach(pat => {

        if (emailLogin.value !== userAll.email) {
            emailLogin.style.border = `1px solid red`

            showNotification("Error!", "red")
            

        }

    })

    if (passwordLogin.value === user.password) {

        setTimeout(() => {
            window.location.href = "./patient.html"
        }, 3000);

        showNotification("Successful login!", "green")

        let currentUser = {
            names: user.names,
            email: user.email,
            role: user.role,
            id: user.id,
            password: user.password,
            image: user.image
        }

        localStorage.setItem("currentUser", JSON.stringify(currentUser))



    } else if (passwordLogin.value !== user.password) {
        passwordLogin.style.border = `1px solid red`



    }




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

let saveee = JSON.parse(localStorage.getItem("currentUser"))
console.log(saveee);