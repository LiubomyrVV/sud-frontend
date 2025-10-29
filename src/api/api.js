// api.js
const BASE_URL = 'http://localhost:5000/api/users';

// ======= Helper =======
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  const data = await res.json();

  return { ...data, status: res.status };
}

// ======= Auth =======

// Register new user
export async function registerUser({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
}

// Login user
export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  localStorage.setItem('token', data.token);
  return data;
}

// Logout user
export function logoutUser() {
  localStorage.removeItem('token');
}

// ======= Users =======

// Get all users (auth required)
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  return handleResponse(res);
}

// Get console users (public)
export async function getConsoleUsers() {
  const res = await fetch(`${BASE_URL}/console`);
  return handleResponse(res);
}

// ======= Admin actions =======

// Update user by id
export async function updateUser(id, { name, email, role }) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ name, email, role }),
  });
  return handleResponse(res);
}

// Delete user by id
export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  });
  return handleResponse(res);
}
