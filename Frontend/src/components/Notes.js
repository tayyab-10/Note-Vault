import React, { useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import "./Notes.css";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <AddNote />
            <div className="row my-3">
            <h2 className="notes-header ms-3">Your Notes</h2>
                {notes && notes.length > 0 ? (
                    notes.map((note) => {
                        return <Noteitem key={note._id} note={note} />;
                    })
                ) : (
                    <p>No notes available</p>
                )}
            </div>
        </>
    );
};

export default Notes;
