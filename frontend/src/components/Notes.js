import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
//import { useState } from "react";
import { BiBookAdd } from "react-icons/bi";

import '../App.css';
const Notes = ({add,input,remove,note,setInput,handleKeypress}) => { 
    return ( 
        <div>
        <div className="title">
        <h1>Notes App</h1>
        </div>
        <div className="inputarea">
            <input type="text" 
             onKeyPress={handleKeypress} 
            placeholder="enter any thing" 
            value={input}
            onChange={(e)=>{
                setInput(e.target.value)
            }}
            className="in-txt" />
            <button className="add" onClick={add}><BiBookAdd size={35} className="icon-add"/></button>
        </div>
        <span className="otr">
        <div className="notesarea">
        {
        ( note && note.length > 0 )
              ? note.map( notes =>   
             <ul className="tble">
                <li key={notes.id} className="val"> {notes.title} </li>
                <button   onClick={()=> remove(notes.id)} className="btn-del"><AiOutlineDelete size={30} className="icon-del"/></button>
            </ul> )
             : null
            //getItems()
           }
        </div>
        
        </span>
    </div>      
     );
}
 
export default Notes;