import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { getCurrentUser, logout } from './auth';
import './App.css';

function App() {
  const currentUserFromStorage = getCurrentUser();
  const [notes, setNotes] = useState(() => {
    // Initialize notes from localStorage on mount
    if (currentUserFromStorage) {
      return JSON.parse(localStorage.getItem(`notes_${currentUserFromStorage}`)) || [];
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(currentUserFromStorage);
  const navigate = useNavigate();

  // Load user-specific notes from localStorage when currentUser changes
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
    if (currentUser && notes.length > 0) {
      try {
        localStorage.setItem(`notes_${currentUser}`, JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes to localStorage:', error);
      }
    }
  }, [notes, currentUser]);

  // Add a new note
  const addNote = (content, color) => {
    const now = new Date().toISOString();
    const newNote = {
      id: Date.now(),
      content,
      color,
      isPinned: false,
      createdAt: now,
      updatedAt: now,
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
          ? { ...note, content: newContent, color: newColor, updatedAt: new Date().toISOString() }
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
    navigate('/home');
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate pinned and unpinned notes
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

  // Get display name from username
  const getDisplayName = () => {
    return currentUser || 'User';
  };

  // Protected Notes component
  const Notes = () => {
    const [quote, setQuote] = useState({ content: '', author: '' });

    // Fetch random quote on mount (every page load/refresh)
    useEffect(() => {
      const fetchQuote = async () => {
        try {
          const response = await fetch('https://api.quotable.io/random');
          if (!response.ok) throw new Error('Failed to fetch quote');
          const data = await response.json();
          setQuote({ content: data.content, author: data.author });
        } catch (error) {
          console.error('Error fetching quote:', error);
          setQuote({
            content: 'Keep going, you’ve got this!',
            author: 'Anonymous',
          });
        }
      };
      fetchQuote();
    }, []); // Empty dependency array ensures fetch on every mount

    return (
      <div className="notes fade-in">
        <header className="notes-header">
          <div className="header-left">
            <h2 className="greeting">Hi {getDisplayName()}!</h2>
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
        {quote.content && (
          <div className="quote">
            <p>"{quote.content}" – {quote.author}</p>
          </div>
        )}
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
  };

  return (
    <div className="app fade-in">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/"
          element={
            currentUser ? (
              <Notes />
            ) : (
              <Navigate to="/home" replace />
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