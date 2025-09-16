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



let appointmentList = [

]


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
    } else {
        appointmentBox.classList.add('active')

    }

})

appointmentCloseBtn.addEventListener(`click`, () => {

    appointmentBox.classList.remove('active')

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
            describe: describeValue

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



    }
})


let save = JSON.parse(localStorage.getItem("appointment"))
console.log("Сохранено", save);


