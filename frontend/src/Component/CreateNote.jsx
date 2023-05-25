import React, { useState } from "react";
const CreateNote = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handleNotes = () => {
        const payload = { title, body }
        console.log(payload)
        fetch("http://localhost:5500/notes/create", {
            method: "post",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res =>console.log(res) )
            .catch(err => console.log(err))
    }

    return (
        <div className="createnote">
            <div>create Notes Page</div>
            <input type="text" placeholder="Title here" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Body content here" value={body} onChange={(e) => setBody(e.target.value)} />
            <button onClick={handleNotes}>Add Note</button>


        </div>
    )
}
export default CreateNote;