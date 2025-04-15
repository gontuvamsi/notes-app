import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Login from './components/Login';
import Register from './components/Register';
import { getCurrentUser, logout } from './auth';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  // Load user-specific notes from localStorage
  useEffect(() => {
    if (currentUser) {
      const userNotes = JSON.parse(localStorage.getItem(`notes_${currentUser}`)) || [];
      setNotes(userNotes);
    } else {
      setNotes([]);
    }
  }, [currentUser]);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`notes_${currentUser}`, JSON.stringify(notes));
    }
  }, [notes, currentUser]);

  // Add a new note
  const addNote = (content, color) => {
    const newNote = {
      id: Date.now(),
      content,
      color,
      isPinned: false,
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Edit a note
  const editNote = (id, newContent, newColor) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, content: newContent, color: newColor }
          : note
      )
    );
  };

  // Toggle pin status
  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setNotes([]);
    navigate('/login');
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate pinned and unpinned notes
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

  // Protected Notes component
  const Notes = () => (
    <div className="notes fade-in">
      <header className="notes-header">
        <div className="header-left">
          <h2 className="greeting">Hi {currentUser}!</h2>
          <h1>Notes App</h1>
        </div>
        <div className="header-actions">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      <NoteForm addNote={addNote} />
      <NoteList
        pinnedNotes={pinnedNotes}
        unpinnedNotes={unpinnedNotes}
        deleteNote={deleteNote}
        editNote={editNote}
        togglePin={togglePin}
      />
    </div>
  );

  return (
    <div className="app fade-in">
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Notes />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !currentUser ? (
              <Login setCurrentUser={setCurrentUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !currentUser ? (
              <Register setCurrentUser={setCurrentUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;