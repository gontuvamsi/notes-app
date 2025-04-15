import bcrypt from 'bcryptjs';

// Register a new user
export const registerUser = (username, password) => {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    return { error: 'Username already exists' };
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  users[username] = hashedPassword;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', username);
  return { success: true };
};

// Login a user
export const loginUser = (username, password) => {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  const hashedPassword = users[username];
  if (!hashedPassword) {
    return { error: 'Username does not exist' };
  }
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
  if (!isPasswordValid) {
    return { error: 'Incorrect password' };
  }
  localStorage.setItem('currentUser', username);
  return { success: true };
};

// Get current user
export const getCurrentUser = () => {
  return localStorage.getItem('currentUser');
};

// Logout user
export const logout = () => {
  localStorage.removeItem('currentUser');
};