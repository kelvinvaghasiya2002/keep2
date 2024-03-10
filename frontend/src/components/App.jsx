import React,{useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note"
import axios from "axios";


function App() {
    const [notes , setNotes] = useState([]);

    function updateNotes(note){
        async function Add() {
            try{
                const response = await axios.post(`http://localhost:4000/post?title=${note.title}&content=${note.content}`);
                return response.data;
            }catch(err){
                console.log(err)
            }
        }
        Add().then((data)=>{
            setNotes(data);
        }).catch((err)=>{
            console.log(err);
        });
        
        // setNotes((prevValue)=>{
        //     return (
        //         [...prevValue , note]
        //     )
        // })
        // setNotes(data);
    }

    function handleDelete(id){

        async function Delete() {
            try{
                const response = await axios.delete(`http://localhost:4000/delete/${id}`);
                // console.log(response.data);
                return response.data
            }catch(err){
                console.log(err);
            }
        }

        Delete().then((data)=>{
            setNotes(data);
        }).catch((err)=>{
            console.log(err);
        });

        // setNotes((prevValue)=>{
        //     return prevValue.filter((item,index)=>{
        //         return index!==id;
        //     })
        // })
    }

    useEffect(()=>{
        async function call() {
            try{
                const response = await axios.get("http://localhost:4000");
                return response.data ;
            }catch(err){
                console.log(err);
            }
        }
        call().then((data)=>{
            setNotes(data);
        }).catch((err)=>{
            console.log(err);
        });

    },[notes]);

    return (
        <div>
            <Header />
            <CreateArea onAdd={updateNotes} />
            {notes.map((note,index)=>{
                return (
                    <Note key={index} id={note.id}  title={note.title} content={note.content} onDelete={handleDelete} />
                )
            })}
            <Footer />
        </div>
    )
}

export default App;