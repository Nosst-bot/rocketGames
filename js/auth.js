// js/auth.js
// -------------------------------------------------------------------
// AuthStore: pequeño gestor de usuarios y sesión con localStorage.
// Mantiene el mismo API que usa el profe:
// - AuthStore.registerUser({ name, email, pass })
// - AuthStore.loginUser(email, pass)
// Retorna { ok: true, dest } o { ok: false, code, message }.
// -------------------------------------------------------------------

const AuthStore = (() => {
  const USERS_KEY = "rg_users";
  const SESSION_KEY = "rg_session";

  // --- utilidades de almacenamiento ---
  function _getUsers() {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  function _saveUsers(list) {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  }
  function _findByEmail(email) {
    const list = _getUsers();
    return list.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  // --- registro ---
  function registerUser({ name, email, pass }) {
    // Validaciones simples (HTML5 también valida en el form)
    if (!name?.trim()) return { ok: false, message: "El nombre es requerido." };
    if (!email?.trim()) return { ok: false, message: "El correo es requerido." };
    if (!pass || pass.length < 6) {
      return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
    }
    // ¿Correo ya existe?
    if (_findByEmail(email)) {
      return { ok: false, message: "Ese correo ya está registrado." };
    }
    const users = _getUsers();
    users.push({
      name: name.trim(),
      email: email.trim(),
      pass, // ⚠️ DEMO: en producción jamás guardes contraseñas planas
      createdAt: Date.now(),
      role: "Cliente"
    });
    _saveUsers(users);
    return { ok: true, dest: "login.html" };
  }

  // --- login ---
  function loginUser(email, pass) {
    if (!email?.trim() || !pass) {
      return { ok: false, message: "Completa correo y contraseña." };
    }
    const u = _findByEmail(email);
    if (!u) return { ok: false, code: "not_found", message: "Correo no registrado." };
    if (u.pass !== pass) return { ok: false, code: "bad_password", message: "Contraseña incorrecta." };

    // Guardamos sesión mínima
    const sessionUser = { name: u.name, email: u.email, role: u.role, ts: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { ok: true, dest: "index.html" }; // cambia si quieres otro destino
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function currentUser() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  return { registerUser, loginUser, logout, currentUser };
})();

// lo exponemos en window como hace el profe
window.AuthStore = AuthStore;
