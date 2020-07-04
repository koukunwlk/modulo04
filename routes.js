const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', (req, res) => {
    return res.redirect('/instructors')
})

routes.get('/instructors', (req, res) => {
    return res.render('./instructors/index')
})

routes.get('/instructors/create', (req, res) => {
    return res.render('./instructors/create')
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)


routes.post("/instructors", instructors.post)

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

routes.get('/members', (req, res) => {
    return res.render('/members')
})





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