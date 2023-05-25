import React, { useEffect, useState } from "react";
const Note = () => {

    const [notes, setNotes] = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        fetch("http://localhost:5500/notes/", {
            method: "get",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                setNotes(res)
            })
            .catch(err => console.log(err))


    }

    const deleteNote = (noteId) => {
        // console.log(noteId)
        let res = fetch(`http://localhost:5500/notes/delete/${noteId}`, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem("token")
            }

        })
        //    getNotes()
    }


    return (
        <div className="note-list">
            <div> Notes List Page</div>

            <ul>
                <li>S.No</li>
                <li>Title</li>
                <li>Body</li>
                <li>Delete</li>

            </ul>
            {
                notes.length > 0 ? notes.map((item, index) => {
                    return (
                        <>
                            <ul key={item._id}>
                                <li>{index + 1}</li>
                                <li>{item.title}</li>
                                <li>{item.body}</li>
                                <li>{<button onClick={() => deleteNote(item._id)}>Delete</button>}</li>

                            </ul>
                        </>
                    )
                })
                    :
                    <h1>No Result Found</h1>
            }



        </div>
    )
}
export default Note;