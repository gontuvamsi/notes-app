import React, { useState } from 'react';
import './NoteCard.css';

function NoteCard({ note, deleteNote, editNote, togglePin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(note.content);
  const [newColor, setNewColor] = useState(note.color);

  const colors = ['#E9D5FF', '#C4B5FD', '#A78BFA', '#D8B4FE', '#F3E8FF'];

  const handleSave = () => {
    if (newContent.trim()) {
      editNote(note.id, newContent, newColor);
      setIsEditing(false);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      {isEditing ? (
        <div className="note-edit">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="edit-textarea"
          />
          <div className="color-options">
            {colors.map((color) => (
              <button
                key={color}
                className="color-btn"
                style={{ backgroundColor: color }}
                onClick={() => setNewColor(color)}
              />
            ))}
          </div>
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>
              <i className="fas fa-save"></i> Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="note-content">
          {note.isPinned && <span className="pin-badge">Pinned</span>}
          <pre className="note-text">{note.content}</pre>
          <div className="note-timestamps">
            <p>Created: {formatDateTime(note.createdAt)}</p>
            <p>Updated: {formatDateTime(note.updatedAt)}</p>
          </div>
          <div className="note-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <i className="fas fa-pen"></i> Edit
            </button>
            <button className="delete-btn" onClick={() => deleteNote(note.id)}>
              <i className="fas fa-trash"></i> Delete
            </button>
            <button className="pin-btn" onClick={() => togglePin(note.id)}>
              <i className="fas fa-thumbtack"></i> {note.isPinned ? 'Unpin' : 'Pin'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteCard;