import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const { note } = props;

  const [editedNote, setEditedNote] = useState({ id: note._id, title: note.title, description: note.description, tag: note.tag });
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setEditedNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setEditedNote({
      ...editedNote,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveClick = () => {
    editNote(editedNote.id, editedNote.title, editedNote.description, editedNote.tag);
    setShowModal(false);
  };

  return (
    <>  
      <div className="note-item">
      <div className="note-card shadow-sm">
        <div className="note-card-body">
          <div className="note-card-header d-flex align-items-center justify-content-between">
            <h5 className="note-card-title">{note.title}</h5>
            <div className="note-card-actions">
              <i className="far fa-edit mx-2" onClick={handleEditClick} data-bs-toggle="modal" data-bs-target={`#editModal-${note._id}`}></i>
              <i className="far fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>
            </div>
          </div>
          <p className="note-card-text">{note.description}</p>
          <span className="badge bg-primary">{note.tag}</span>
        </div>
      </div>
      </div>

    {/* Modal for Edit */}
    <div className={`modal fade ${showModal ? 'show' : ''}`} id={`editModal-${note._id}`} tabIndex="-1" aria-labelledby={`editModalLabel-${note._id}`} aria-hidden="true">
        <div className="modal-dialog" style={{marginTop:"6rem"}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editModalLabel-${note._id}`}>Edit Note</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor={`edit-title-${note._id}`} className="form-label">Title:</label>
                  <input type="text" className="form-control" id={`edit-title-${note._id}`} name="title" value={editedNote.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor={`edit-description-${note._id}`} className="form-label">Description:</label>
                  <textarea className="form-control" id={`edit-description-${note._id}`} name="description" value={editedNote.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor={`edit-tag-${note._id}`} className="form-label">Tag:</label>
                  <input type="text" className="form-control" id={`edit-tag-${note._id}`} name="tag" value={editedNote.tag} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
      </>



  );
};

export default Noteitem;
