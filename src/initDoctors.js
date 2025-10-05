let InitDoctors = [
    {
        id: 1,
        names: "Dr.Johny Sins",
        type: "Ginecolog",
        image: "./doctorsAvatar/JohnSins.jpg",
        role: "doctor",
        email: "john@gmail.com",
        password: "johnLisiy"
    },
    {
        id: 2,
        names: "Dr.Emily Carter",
        type: "Pediatrician",
        image: "./doctorsAvatar/EmilyCarter.png",
        role: "doctor",
        email: "emily@gmail.com",
        password: "emily123"
    },
    {
        id: 3,
        names: "Dr.James Anderson",
        type: "Cardiologist",
        image: "./doctorsAvatar/JamesAnderson.png",
        role: "doctor",
        email: "james@gmail.com",
        password: "james123"
    },
    {
        id: 4,
        names: "Dr.Michael Roberts",
        type: "Psychiatrist",
        image: "./doctorsAvatar/MichaelRoberts.png",
        role: "doctor",
        email: "michael@gmail.com",
        password: "michael123"
    },
    {
        id: 5,
        names: "Dr.Sophia Mitchell",
        type: "Surgeon",
        image: "./doctorsAvatar/SophiaMitchell.png",
        role: "doctor",
        email: "sophia@gmail.com",
        password: "sophia123"
    }
]

let existingUsers = JSON.parse(localStorage.getItem("userReg")) || []

InitDoctors.forEach((doc) => {
    if (!existingUsers.some(u => u.email === doc.email)) {
        existingUsers.push(doc)
    }
})

localStorage.setItem("userReg", JSON.stringify(existingUsers))