import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm" style={{ marginTop: "7rem" }}>
        <div className="card-header text-center">
          <h2 className="mb-0">Add a Note</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={note.title}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={note.description}
                onChange={onChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Note</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
