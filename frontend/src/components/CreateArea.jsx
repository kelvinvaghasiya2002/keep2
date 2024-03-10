import React, { useState } from "react";
import { Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function CreateArea(props) {

    const [formData, setData] = useState({
        title: "",
        content: ""
    });


    const [isClicked, setClick] = useState(false);


    function handleSubmit(event) {
        props.onAdd(formData)
        setData({
            title: "",
            content: ""
        })
        event.preventDefault()
    }

    function handleChange(event) {
        const name = event.target.name;
        console.log(name);
        setData((prevValue) => {
            return (
                {
                    ...prevValue,
                    [name]: event.target.value
                }
            )
        })
    }

    function handleClick() {
        setClick(true);
    }

    return (
        <form onSubmit={handleSubmit} className="create-note">
            <input onClick={handleClick} onChange={handleChange} placeholder={isClicked?"Title":"Take a note..."} name="title" value={formData.title} />

            { isClicked && <textarea
                
                onChange={handleChange}
                placeholder="Take a note..."
                rows={isClicked ? 3 : 1} cols={1}
                name="content"
                value={formData.content}
            />}

            <Zoom in={isClicked ? true : false}>
                <button type="submit">
                    <AddIcon />
                </button>
            </Zoom>
        </form>
    )
}



export default CreateArea;