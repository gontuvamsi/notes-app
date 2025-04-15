import React, { useState } from 'react';
import './NoteForm.css';

const colors = ['#E9D5FF', '#C4B5FD', '#A78BFA', '#D8B4FE', '#F3E8FF'];

function NoteForm({ addNote }) {
  const [content, setContent] = useState('');
  const [color, setColor] = useState(colors[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addNote(content, color);
      setContent('');
      setColor(colors[0]);
    }
  };

  return (
    <form className="note-form fade-in " onSubmit={handleSubmit}>
      <div className="textarea-wrapper">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note..."
          rows="5"
        />
      </div>
      <div className="form-footer">
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
        <button type="submit" className="add-btn">Add Note</button>
      </div>
    </form>
  );
}

export default NoteForm;