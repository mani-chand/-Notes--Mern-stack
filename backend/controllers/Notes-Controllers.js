const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Result = require('./../models/notesModel')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
let notes = [
    {
    id:uuidv4(),
    title: "I am Manichand",
    creator:"u1"
    },
    {
    id:uuidv4(),
    title: "I studying btech 3rd year",
    creator:"u1"
    },
    {
    id:uuidv4(),
    title: "Collage is KL university",
    creator:"u2"
    }
]

const getNotes=(req,res,next)=>{
   res.json(notes)
}
const noteRoute = (req,res,next)=>{
    const noteid=req.params.id
    console.log(noteid)
    const note=notes.filter(n=>{
        return noteid===n.id
    })
    if(!note){
        return res.status(404).json("no note found")
    }
    res.json({note})
}

const createNote = async (req,res,next)=>{
    //destructuring
  const {title,creator} = req.body
  const newNote={
    title,//title=title
    creator
  }
  var final = await Result.result(newNote).save()
  //res.json(final)
}

const removeNote = (req,res,next)=>{
    let id = req.params.id
   newNote=notes.filter(n=>{
       return n.id!==id
   })
   notes=newNote
   res.status(200)
   res.json("note deleted")
}
exports.noteRoute=noteRoute
exports.createNote=createNote
exports.removeNote=removeNote
exports.getNotes=getNotes