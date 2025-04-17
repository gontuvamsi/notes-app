
export function register(username, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    throw new Error('Username already exists');
  }

  if (Object.values(users).some(user => user.email === email)) {
    throw new Error('Email already registered');
  }

  const hashedPassword = password;
  users[username] = { username, email, password: hashedPassword };
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', username);
}

export function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = Object.values(users).find(user => user.email === email);

  if (!user) {
    throw new Error('Email not found');
  }

 let isPasswordValid = false
  if (password === user.password) {
    isPasswordValid = true
  } else {
    isPasswordValid = false
  }
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  localStorage.setItem('currentUser', user.username);
  return user.username;
}

export function logout() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  return localStorage.getItem('currentUser') || null;
}