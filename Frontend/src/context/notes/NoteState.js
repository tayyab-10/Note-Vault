import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const Host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  

  // Fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${Host}/api/notes/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODY1ZTllZTEzYjNjZTE1Mzc2NmVmIn0sImlhdCI6MTcxOTE2NjQ0MSwiZXhwIjoxNzE5MTcwMDQxfQ.5R1yYv8PnWP_qQeHOpzWoEop3kFDuvjycVz0-WYFmT8"
      },
    });

    const data = await response.json();
    setNotes(data);
    console.log(data);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note");

    const response = await fetch(`${Host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODY1ZTllZTEzYjNjZTE1Mzc2NmVmIn0sImlhdCI6MTcxOTE2NjQ0MSwiZXhwIjoxNzE5MTcwMDQxfQ.5R1yYv8PnWP_qQeHOpzWoEop3kFDuvjycVz0-WYFmT8"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes([...notes, note]);
    console.log(note);
  };

  // Delete a Note
  const deleteNote = async (id) => {
    console.log("Deleting the note with id " + id);

    await fetch(`${Host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODY1ZTllZTEzYjNjZTE1Mzc2NmVmIn0sImlhdCI6MTcxOTE2NjQ0MSwiZXhwIjoxNzE5MTcwMDQxfQ.5R1yYv8PnWP_qQeHOpzWoEop3kFDuvjycVz0-WYFmT8"
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    console.log("Editing the note with id " + id);

    const updatedNote = { title, description, tag };

    try {
      const response = await fetch(`${Host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODY1ZTllZTEzYjNjZTE1Mzc2NmVmIn0sImlhdCI6MTcxOTE2NjQ0MSwiZXhwIjoxNzE5MTcwMDQxfQ.5R1yYv8PnWP_qQeHOpzWoEop3kFDuvjycVz0-WYFmT8"
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Note updated successfully: ", result);

        const newNotes = notes.map((note) => {
          if (note._id === id) {
            return { ...note, title, description, tag };
          }
          return note;
        });

        setNotes(newNotes);
      } else {
        console.error("Failed to update note:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error while updating note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
