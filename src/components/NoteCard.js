import React, { useState } from 'react';
import './NoteCard.css';

const colors = ['#E9D5FF', '#C4B5FD', '#A78BFA', '#D8B4FE', '#F3E8FF'];

function NoteCard({ note, deleteNote, editNote, togglePin, animationDelay }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);

  const handleSave = () => {
    if (content.trim()) {
      editNote(note.id, content, color);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="note-card slide-in"
      style={{
        backgroundColor: note.color,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {note.isPinned && <span className="pinned-badge">📌 Pinned</span>}
      {isEditing ? (
        <div className="edit-mode">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
          />
          <div className="color-picker">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                className={`color-btn ${color === c ? 'selected' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>{note.content}</p>
          <div className="note-actions">
            <button
              onClick={() => togglePin(note.id)}
              className="pin-btn"
              title={note.isPinned ? 'Unpin' : 'Pin'}
            >
              {note.isPinned ? '📌' : '📍'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              className="delete-btn"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteCard;