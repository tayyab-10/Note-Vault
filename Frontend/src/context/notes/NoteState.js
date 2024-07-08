import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const Host = "http://localhost:5000";
  const [notes, setNotes] = useState([]); // Ensure notes is initialized as an array

  // Fetch all notes
  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`${Host}/api/notes/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        console.log(data);
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      // Handle error (e.g., setNotes([]), display error message)
    }
  };
  
  


  // Add a Note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note");

    try {
      
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');  //toddo Alert 
        }
      const response = await fetch(`${Host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      if (response.ok) {
        setNotes([...notes, note]);
      } else {
        console.error("Failed to add note:", note);
      }
      console.log(note);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    console.log("Deleting the note with id " + id);

    try {
    
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
      const response = await fetch(`${Host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });

      if (response.ok) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    console.log("Editing the note with id " + id);

    const updatedNote = { title, description, tag };

    try {
    
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
      const response = await fetch(`${Host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
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

  const handleSignUp = async () => {
    const { name, password, email } = credentials;
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password, email })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Registration successful");
        localStorage.setItem('token', json.authtoken);
        navigate("/home");
        } else {
        console.error("Registration failed:", data);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration. Please try again later.");
    }
  };
  

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,handleSignUp }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
