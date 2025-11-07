const BASE_URL = 'http://localhost:5000/api/users';

// ======= Helper =======
async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  return { ...data, status: res.status };
}

// ======= Auth =======

// Get current user info (JWT in cookie)
export async function getUserInfo() {
  const res = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res);
}

// Register new user
export async function registerUser({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
  });
  return handleResponse(res);
}

// Login user
export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  return handleResponse(res);
}

// Logout user
export async function logoutUser() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(res);
}

// ======= Users (for admin) =======

// Get all users (auth required)
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res);
}

// Get console users (public)
export async function getConsoleUsers() {
  const res = await fetch(`${BASE_URL}/console`);
  return handleResponse(res);
}

// Update user by id (admin)
export async function updateUser(id, { name, email, role }) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, role }),
    credentials: 'include',
  });
  return handleResponse(res);
}

// Delete user by id (admin)
export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return handleResponse(res);
}
