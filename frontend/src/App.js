import {React,/*useEffect*/} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
//import './App.css';
//import { AiOutlineDelete } from "react-icons/ai";
import uuid from 'react-uuid'
import { useState/*useEffect,useRef */} from 'react';
import './components/Notes.js'   
//import ReactDOM from 'react-dom';
import Notes from './components/Notes.js';
import Edit from './components/Edit.js';
import axios from 'axios'
 

function App() {
  //const [edit,setEdit]=useState("")
  //const [isEdit,setedit]=useState(false)
  const [input,setInput] =useState(" ")
    const getItems = async () =>{
      let Note=await axios.get('http://localhost:5000/')
      .then(res=>{
        return res.data.Notes
      })
      //console.log(Note)
      setNote(Note)
    }
    const [note,setNote]=useState(getItems)
  


    const add=async ()=>{
        //  inputRef.current.focus()
        setInput(" ")
        try {
          const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: document.querySelector('.in-txt').value,
              creator:uuid()
            })
          });
            
          let responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }
         
          //console.log(responseData)
        } catch (err) {
          console.log(err.message)
          
        }
        getItems()
    }
    const remove=async (id) =>{
        console.log(id)
        let newNote=note.filter(item => {
          return item.id!==id
      });
      setNote(newNote)
        try {
          const response = await fetch(`http://localhost:5000/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          let responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }
        
        console.log(newNote)
        } catch (err) {
          console.log(err.message) 
        }
    }
     //useEffect(add(),[note])

      const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
        add()
        setInput(" ")
       
      }
      };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Notes add={add} remove={remove} note={note} handleKeypress={handleKeypress} getItems={getItems} setInput={setInput} input={input}/>} /> 
          <Route path="/edit" element={<Edit />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;
