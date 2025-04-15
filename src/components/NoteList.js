import React from 'react';
import NoteCard from './NoteCard';
import './NoteList.css';

function NoteList({
  pinnedNotes,
  unpinnedNotes,
  deleteNote,
  editNote,
  togglePin,
}) {
  return (
    <div className="note-list">
      {pinnedNotes.length > 0 && (
        <>
          <h2 className="section-title">Pinned Notes</h2>
          <div className="notes-grid">
            {pinnedNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                editNote={editNote}
                togglePin={togglePin}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        </>
      )}
      {unpinnedNotes.length > 0 && (
        <>
          <h2 className="section-title">Other Notes</h2>
          <div className="notes-grid">
            {unpinnedNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                editNote={editNote}
                togglePin={togglePin}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        </>
      )}
      {pinnedNotes.length === 0 && unpinnedNotes.length === 0 && (
        <p className="no-notes">No notes yet. Add one to get started!</p>
      )}
    </div>
  );
}

export default NoteList;