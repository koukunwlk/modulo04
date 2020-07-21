const express = require('express')
const routes = express.Router()
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')


routes.get('/', (req, res) =>{
    res.redirect('/instructors')
})
routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post("/instructors", instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)


routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post("/members", members.post)
routes.put('/members', members.put)
routes.delete('/members', members.delete)



module.exports = routes






/* server.get('/', (req, res)=>{
    res.render('about')
})

server.get('/contents', (req, res)=>{
    res.render('contents', {contents})
})

server.get('/courses/:id', (req, res)=>{
    const id = req.params.id

    const content = contents.find((content)=>{
        if(content.id == id){
            return true
        }
    })

    if(!content){
        return res.send("Content not found")
    }

    return res.render('courses', {content})

})

server.use((req, res)=>{
    res.status(404).render('not-found')
}) */