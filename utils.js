module.exports = {
    age: function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
        return age
    },
    date: (timestamp) => {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${Number(date.getUTCMonth() + 1)}`.slice(-2)
        const day = `${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
        birthDay: `${day}/${month}`}
    },
    bloodType: function(blood){
        switch(blood){
            case "A0":
                return "A-"
            case "A1":
                return "A+"
            case "B0":
                return "B-"
            case "B1":
                return "B+"
            case "AB1":
                return "AB+"
            case "AB0":
                return "AB-"
            case "O0":
                return "O-"
            case "O1":
                return "O+" 
            default:
                return "Can't find blood type"
        }
    }
}
