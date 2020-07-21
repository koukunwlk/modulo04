const member = require('../models/member')
const {age, date} = require('../../lib/utils')

module.exports = {
    index(req, res) {
        member.all((members)=>{
            return res.render("members/index",{members})
        })
    },

    create(req, res) {
        return res.render('./members/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor preencha o campo: ' + key)
            }
        }

        member.crate(req.body, (member)=>{
            return res.redirect(`members/${member.id}`)
        })
        
    }, 

    show(req, res) {
        member.find(req.params.id, (member)=>{
            if(!member) res.send("member not found")
            member.birth = date(member.birth).birthDay
            return res.render('members/show', {member})
        })
    },

    edit(req, res) {
        member.find(req.params.id, (member)=>{
            if(!member) res.send("member not found")
            member.birth = date(member.birth).iso
            return res.render('members/edit', {member})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por preencha o campo: ' + key)
            }
        }
       member.update(req.body, ()=>{
           return res.redirect(`/members/${req.body.id}`)
       })
    },

    delete(req, res) {
        member.delete(req.body.id, ()=>{
            return res.redirect(`/members/`)
        })
    }

}
