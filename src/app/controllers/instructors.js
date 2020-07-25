const instructor = require('../models/instructor')
const {age, date} = require('../../lib/utils')

module.exports = {
    index(req, res) {
        const {filter} = req.query

        if( filter ){
            instructor.findBy(filter, function(instructors){
                return res.render("instructors/index",{instructors, filter})
            })
        } else{
            instructor.all((instructors) =>{
                return res.render("instructors/index",{instructors})
            })  
        }

       
    },

    create(req, res) {
        return res.render('./instructors/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor preencha o campo: ' + key)
            }
        }

        instructor.crate(req.body, (instructor)=>{
            return res.redirect(`/instructors/${instructor.id}`)
        })
        
    },

    show(req, res) {
        instructor.find(req.params.id, (instructor)=>{
            if(!instructor) res.send("Instructor not found")
            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format
            return res.render('instructors/show', {instructor})
        })
    },

    edit(req, res) {
        instructor.find(req.params.id, (instructor)=>{
            if(!instructor) res.send("Instructor not found")
            instructor.birth = date(instructor.birth).iso
            return res.render('instructors/edit', {instructor})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por preencha o campo: ' + key)
            }
        }
       instructor.update(req.body, ()=>{
           return res.redirect(`/instructors/${req.body.id}`)
       })
    },

    delete(req, res) {
        instructor.delete(req.body.id, ()=>{
            return res.redirect(`/instructors/`)
        })
    }

}