const express = require('express')
const app = express()
const fs = require('fs')
const mongoose = require('mongoose')
const http = require('http')
const bodyParser = require('body-parser')
const NoteRoute=require('./routes/Notes-routes')
const NoteControllers=require('./controllers/Notes-Controllers')
const { title } = require('process')
console.log("Hello world")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
/*
app.post('/',(req, res,next)=>{
    console.log(req.body)
   res.send("<h1>"+"hello "+req.body.username+" !"+'</h1>')
 })
 app.get('/',(req,res,next)=>{
    res.send('<form method="POST" action="/user"><input type="text" name="username" placeholder="enter a username"/><button>submit</button></form>')
 })
*/
app.get('/note',NoteControllers.getNotes)
app.get('/note/:id',NoteControllers.noteRoute)
app.delete('/note/:id',NoteControllers.removeNote)
app.post('/note',NoteControllers.createNote)

mongoose
.connect('mongodb+srv://manichand:root@cluster0.oll6q.mongodb.net/Note-App?retryWrites=true&w=majority')
.then(()=> app.listen(5000) )
.catch(e => console.log(e.message))


