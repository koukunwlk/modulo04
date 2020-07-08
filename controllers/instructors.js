const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')
const intl = require('intl')
Intl.DateTimeFormat = intl.DateTimeFormat

exports.index = (req, res) =>{
     return res.render("instructors/index", {instructors: data.instructors})
}

exports.create = (req, res) => {
    return res.render('./instructors/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por preencha o campo: ' + key)
        }
    }
    let {avatar_url, birth , name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4),(err) => {
        if(err) return res.send('Ocorreu um erro: ' + err)

        return res.redirect("/instructors")
    })
}

exports.show = (req, res) => {
    const {id} = req.params

    const foundInstructor = data.instructors.find((instructor)=>{
        return instructor.id == id
    })
    if(!foundInstructor) return res.send('Instructor not found')
   
    let options = { year: 'numeric', month: 'long',}
    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR", options).format(foundInstructor.created_at),
    }

    return res.render('instructors/show', {instructor})
}

exports.edit = (req, res) =>{
    const {id} = req.params

    const foundInstructor = data.instructors.find((instructor)=>{
        return instructor.id == id
    })
    if(!foundInstructor) return res.send('Instructor not found')

    const instructor = {...foundInstructor, birth: date(foundInstructor.birth).iso}

    res.render('instructors/edit', {instructor})
}

exports.put = (req, res) => {
    const {id} = req.body

    let index = 0

    const foundInstructor = data.instructors.find((instructor, foundIndex)=>{
        if(id == instructor.id){
            index = foundIndex
            return true
        }
        
    })
    if(!foundInstructor) return res.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if(err) res.send('Error: ' + err)})

    return res.redirect(`/instructors/${id}`)

}
    

exports.delete = (req, res) =>{
    const {id} = req.body

    const filteredInstructors = data.instructors.filter((instructor)=>{
        return instructor.id != id
    })

    data.instructors = filteredInstructors
    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {if(err) return res.send('Error' + err)})

    return res.redirect("/instructors")
}