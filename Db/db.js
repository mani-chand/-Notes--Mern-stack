const express=require('express')
const app = express()
const mongoose = require('mongoose');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const Model = require('./models/db-model');

const createNote = async (req,res,next)=>{
  const newNote = ({
    title:req.body.title,
    creator:req.body.creator
  })
  var result =await Model.results(newNote).save()
  
   res.json(result.toObject({getters:true}))
}

const getNotes = async (req,res,next) =>{
  var Notes = await Model.results.find().exec();
  res.json({ Notes: Notes.map(user => user.toObject({ getters: true })) })
}

const getNoteById=async (req,res,next)=>{
  let id=req.params.id
  var notesById = await Model.results.findById(id).exec();
  res.json(notesById.toObject({getters:true}))
}
const deleteNoteById=async (req,res,next)=>{
  let id=req.params.id
  var notesById = await Model.results.findByIdAndDelete(id).exec();
  res.json(notesById.toObject({getters:true}))
}
const editNoteById=async (req,res,next)=>{
  let id=req.params.id
  var notesById = await Model.results.findById(id);
  notesById.title=req.body.title
  
  var newNotesById = await Model.results.findByIdAndUpdate(id,notesById);
  res.json(newNotesById.toObject({getters:true}))
}

exports.createNote=createNote
exports.getNotes=getNotes
exports.getNoteById=getNoteById
exports.deleteNoteById=deleteNoteById
exports.editNoteById=editNoteById
