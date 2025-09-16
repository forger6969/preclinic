const box = document.querySelector(`.main-2-left`)
const appointment = document.getElementById(`appointmentBtn`)
const appointmentBox = document.querySelector(`.appointmentBox`)
const doctorListBtn = document.getElementById(`selectDoctor`)
const doctorList = document.querySelector(`.doctorsListBox`)
const appointmentCloseBtn = document.querySelector(`.appointment-close-btn`)

const appointmentDate = document.getElementById(`appointmentDate`)
const appointmentTime = document.getElementById(`appointmentTime`)
const appointmentName = document.getElementById(`appointmentName`)
const appointmentDescribe = document.getElementById(`appointmentDescribe`)
const appointmentApproved = document.getElementById(`appointmentApproved`)
const headerRight = document.querySelector('.header-right')
const main = document.querySelector(`.main`)

const appointmentsBoxHistory = document.querySelector(`.appointmentsBox`)
const avatarka = document.querySelector('.patient-right-avatar-box')






function showNotification(message, duration = 3000) {
    const notification = document.getElementById("notification");
    const text = document.getElementById("notificationText");
    const progressBar = document.getElementById("progressBar");

    text.textContent = message;
    notification.classList.add("show");
    progressBar.style.width = "0%";

    setTimeout(() => {
        progressBar.style.transition = `width ${duration}ms linear`;
        progressBar.style.width = "100%";
    }, 10);

    setTimeout(() => {
        notification.classList.remove("show");
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";
    }, duration);
}

let appointmentList = JSON.parse(localStorage.getItem("appointment")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"))

console.log("Зареганный пользователь:", currentUser);

let avatar = document.createElement("div")
avatar.classList = "avatar"

avatar.innerHTML = `
<img src="${currentUser.image}" alt="">
`

headerRight.append(avatar)

showNotification(`Добро пожаловать ${currentUser.names}`, 3000)


let div = document.createElement(`div`)
div.classList = "doctorsBox"


let users = JSON.parse(localStorage.getItem(`userReg`)) || []

let doctors = users.filter(u => u.role === "doctor")


doctors.forEach(user => {

    let doctorsDiv = document.createElement(`div`)
    doctorsDiv.classList = 'doctorsDiv'

    doctorsDiv.innerHTML = `
    <div class="doctorInfo">
    <img class="doctorsImg" src="${user.image}" alt="">
    <p>${user.names} <br> <span>${user.type}</span></p>
    </div>

<div class="bookingDiv"><div class="bookings"><p>15 Bookings</p></div></div>
    `

    div.append(doctorsDiv)

})

box.append(div)


doctors.forEach(doc => {

    doctorList.innerHTML += `
    
    <div class="doctorBoxx">

                            <div class="doctorInfo">
                                <img src="${doc.image}" alt="">
                                <p class="doctorName">${doc.names}<br> <span>${doc.type}</span></p>
                            </div>

                        </div>

    `




})

const doctorCard = document.querySelectorAll(`.doctorBoxx`)


AOS.refresh();

doctorListBtn.addEventListener(`click`, () => {





    if (doctorList.classList.contains(`active`)) {
        doctorList.classList.remove(`active`)
        doctorListBtn.classList.remove(`active`)

    } else {
        doctorList.classList.add(`active`)
        doctorListBtn.classList.add(`active`)
    }

})

appointment.addEventListener(`click`, () => {

    if (appointmentBox.classList.contains('active')) {
        appointmentBox.classList.remove('active')
        main.classList.remove(`active`)
        document.body.classList.remove("active")
    } else {
        appointmentBox.classList.add('active')
        main.classList.add(`active`)
        document.body.classList.add("active")

    }

})

appointmentCloseBtn.addEventListener(`click`, () => {

    appointmentBox.classList.remove('active')
    main.classList.remove(`active`)
    document.body.classList.remove("active")

})

let selectedDoctor = ""

doctorCard.forEach(doctor => {
    doctor.addEventListener(`click`, () => {
        let docValue = doctor.querySelector(".doctorName").childNodes[0].textContent.trim();

        selectedDoctor = docValue;

        doctorListBtn.innerHTML = `${docValue} <img src="./icons/Vector (23).svg" alt="">`;

        doctorList.classList.remove("active");
        doctorListBtn.classList.remove("active");
    });
});






appointmentApproved.addEventListener(`click`, () => {

    let doctorValue = doctorListBtn.textContent

    console.log(selectedDoctor);

    let appDoc = doctors.filter(doc => doc.names === selectedDoctor)

    let docId

    appDoc.forEach(id => {
        docId = id.id
    })

    console.log(docId);



    let dateValue = appointmentDate.value
    let timeValue = appointmentTime.value
    let nameValue = appointmentName.value
    let describeValue = appointmentDescribe.value

    if (doctorValue === "" || dateValue === "" || timeValue === "" || nameValue === "" || describeValue === "") {
        alert(`Заполните все поля!`)
    } else {

        let appointment = {

            doctorId: docId,
            date: dateValue,
            time: timeValue,
            patientName: nameValue,
            describe: describeValue,
            patientId: currentUser.id
        }

        appointmentList.push(appointment)
        localStorage.setItem("appointment", JSON.stringify(appointmentList));

        appointmentDate.value = ""
        appointmentTime.value = ""
        appointmentName.value = ""
        appointmentDescribe.value = ""
        doctorListBtn.innerHTML = `
        Select doctor <img src="./icons/Vector (23).svg" alt="">
        `

        showNotification("Successful entry!")

        appointmentBox.classList.remove(`active`)
        main.classList.remove('active')

    }
})


let save = JSON.parse(localStorage.getItem("appointment"))
console.log("Сохранено", save);

let monthlyCounts = Array(12).fill(0); // [0,0,0,...] для 12 месяцев

save.forEach(app => {
    let month = new Date(app.date).getMonth();
    monthlyCounts[month] += 1;
});

console.log(monthlyCounts);

const ctx = document.getElementById('appointmentsChart').getContext('2d');


const data = {
    labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [{
        label: 'Appointments',
        data: monthlyCounts,
        backgroundColor: [
            "rgba(46, 55, 164, 0.4)",
            "rgba(224, 79, 22, 0.4)",
            "rgba(76, 175, 80, 0.4)",
            "rgba(33, 150, 243, 0.4)",
            "rgba(255, 193, 7, 0.4)",
            "rgba(156, 39, 176, 0.4)",
            "rgba(0, 188, 212, 0.4)",
            "rgba(121, 85, 72, 0.4)",
            "rgba(205, 220, 57, 0.4)",
            "rgba(233, 30, 99, 0.4)",
            "rgba(150, 150, 150, 0.4)",
            "rgba(100, 181, 246, 0.4)"
        ],
        borderColor: [
            "rgba(46, 55, 164, 1)",
            "rgba(224, 79, 22, 1)",
            "rgba(76, 175, 80, 1)",
            "rgba(33, 150, 243, 1)",
            "rgba(255, 193, 7, 1)",
            "rgba(156, 39, 176, 1)",
            "rgba(0, 188, 212, 1)",
            "rgba(121, 85, 72, 1)",
            "rgba(205, 220, 57, 1)",
            "rgba(233, 30, 99, 1)",
            "rgba(150, 150, 150, 1)",
            "rgba(100, 181, 246, 1)"
        ],
        borderWidth: 1
    }]
};

const config = {
    type: 'bar', // можно 'bar', 'line', 'pie', ...
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Appointments per Month'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Appointments'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            }
        }
    }
};

const appointmentsChart = new Chart(ctx, config);

let appoint = JSON.parse(localStorage.getItem("appointment"))

console.log(appoint);

let searchUser = appoint.filter(u => u.patientId === currentUser.id)


console.log(searchUser);

searchUser.forEach(u => {

    let doctorFilter = doctors.find(d => d.id === u.doctorId)


    let historyDiv = document.createElement(`div`)
    historyDiv.innerHTML = `

<img src="${doctorFilter.image}" alt="">

                                        <p class="appOcheredText">${doctorFilter.names}<br><span>${doctorFilter.type}</span></p>

                                        <p class="date">${u.date}</p>

`

    appointmentsBoxHistory.append(historyDiv)

})


avatarka.innerHTML = `
<img src="./usersAvatar/defolt.png" alt="">

                                    <p class="avatar-name">${currentUser.names}</p>
                                    <p class="avatar-id">ID:${currentUser.id}</p>
`


