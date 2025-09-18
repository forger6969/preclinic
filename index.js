const namesInput = document.getElementById(`name`)
const emailInput = document.getElementById(`email`)
const passwordInput = document.getElementById(`password`)
const passwordConfirm = document.getElementById(`confirm`)

const privacy = document.querySelector(`.privacy`)

let registerBtn = document.getElementById(`register`)
let privacybtn = document.getElementById(`privacyBtn`)


let userss = JSON.parse(localStorage.getItem("userReg"))

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



    let nameValue = namesInput.value
    let emailValue = emailInput.value
    let passwordValue = passwordInput.value
    let passwordConfirmValue = passwordConfirm.value

    userss.forEach(user => {
        if (emailInput.value === user.email) {

            showNotification("This email is already registered", "red")

        }
    })

    if (namesInput.value === "" || emailInput.value === "" || passwordInput.value === "" || passwordConfirm.value === "") {

        showNotification("fill in all fields", "red")

    } else if (passwordInput.value === passwordConfirm.value && privacybtn.classList.contains(`active`)) {


        let newUser = {
            id: userss.length + 1,
            names: nameValue,
            email: emailValue,
            password: passwordValue,
            role: "patient",
            image: "./usersAvatar/defolt.png"
        }

        userss.push(newUser)

        console.log("reg1", userss)


        localStorage.setItem("userReg", JSON.stringify(userss));

        console.log(`Сохранено`);


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
