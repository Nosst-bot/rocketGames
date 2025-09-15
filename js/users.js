/**
 * users.js
 * -----------
 * "Mini base de datos" de usuarios usando LocalStorage.
 * - Guardamos un arreglo JSON bajo la clave USERS_KEY.
 * - Exponemos funciones para crear usuarios y validarlos (RUN, email, etc.).
 *
 * ¿Por qué así?
 *  - Es 100% front (no necesitas backend para la entrega).
 *  - Hace “persistencia” simple entre recargas (LocalStorage).
 *  - Te permite tener un flujo real: registrarse → iniciar sesión.
 */

const USERS_KEY = "rg_users";

/* =========================
 * Utilidades de almacenamiento
 * ========================= */

/**
 * Lee todos los usuarios guardados en LocalStorage.
 * Retorna [] si no hay ninguno.
 */
export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Guarda el arreglo completo de usuarios en LocalStorage.
 */
export function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

/**
 * Busca un usuario por email (case-insensitive).
 */
export function findUserByEmail(email) {
  const list = getUsers();
  return list.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/* =========================
 * Validaciones de negocio
 * ========================= */

/**
 * Email permitido por dominio y largo.
 * - Máximo 100 caracteres.
 * - Debe terminar en uno de estos dominios:
 *   @duoc.cl, @profesor.duoc.cl, @gmail.com
 */
export function isAllowedEmail(email) {
  if (!email || email.length > 100) return false;
  const allowed = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  const e = email.toLowerCase();
  return allowed.some((dom) => e.endsWith(dom));
}

/**
 * Normaliza RUN: quita puntos y guion, y lo pasa a mayúsculas.
 * Ej: "12.345.678-9" -> "123456789"
 */
function normalizeRUN(run) {
  return run.toUpperCase().replaceAll(".", "").replaceAll("-", "").trim();
}

/**
 * Valida RUN chileno con dígito verificador (módulo 11).
 * Acepta que el usuario escriba con o sin puntos/guion; internamente normalizamos.
 * Reglas:
 * - Largo del cuerpo + DV entre 7 y 9 (ej: 1234567K, 12345678-9, etc.)
 * - DV puede ser 0-9 o K.
 */
export function isValidRUN(runInput) {
  if (!runInput) return false;

  const run = normalizeRUN(runInput);
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo) || !/^[0-9K]$/.test(dv)) return false;

  // Cálculo DV (módulo 11, multiplicadores 2..7 cíclicos)
  let sum = 0;
  let mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    sum += parseInt(cuerpo[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const res = 11 - (sum % 11);
  const dvCalc = res === 11 ? "0" : res === 10 ? "K" : String(res);

  return dv === dvCalc;
}

/* =========================
 * Crear usuario (registro)
 * ========================= */

/**
 * Crea un usuario con validaciones de negocio.
 * Espera un objeto:
 * {
 *   run, name, lastname, email, password, address,
 *   region? (opcional), comuna? (opcional), role? (opcional)
 * }
 *
 * Retorna { ok: true } o { ok: false, errors: [...] }
 *
 * ¿Por qué validamos acá?
 * - Centraliza reglas: da lo mismo desde qué formulario se llame,
 *   las reglas son consistentes (correo, contraseña, RUN, etc.).
 */
export function createUser(user) {
  const errors = [];

  // Validaciones principales (ajústalas si tu pauta pide otras longitudes)
  if (!isValidRUN(user.run))
    errors.push(
      "RUN inválido (puedes escribirlo con o sin puntos/guion; debe tener DV válido)."
    );
  if (!user.name || user.name.length > 50)
    errors.push("Nombre requerido (máx. 50).");
  if (!user.lastname || user.lastname.length > 100)
    errors.push("Apellidos requeridos (máx. 100).");
  if (!isAllowedEmail(user.email))
    errors.push(
      "Correo inválido o dominio no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com; máx. 100)."
    );
  if (!user.password || user.password.length < 4 || user.password.length > 10)
    errors.push("Contraseña debe tener entre 4 y 10 caracteres.");
  if (!user.address || user.address.length > 300)
    errors.push("Dirección requerida (máx. 300).");

  // ¿Ya existe el correo?
  const existing = findUserByEmail(user.email);
  if (existing) errors.push("Ya existe un usuario registrado con ese correo.");

  if (errors.length) return { ok: false, errors };

  // Si todo ok, guardamos
  const list = getUsers();
  const role = user.role || "Cliente"; // por defecto
  list.push({
    run: normalizeRUN(user.run),
    name: user.name.trim(),
    lastname: user.lastname.trim(),
    email: user.email.trim(),
    password: user.password, // ⚠️ DEMO: en producción NUNCA se guarda así.
    address: user.address.trim(),
    region: user.region || null,
    comuna: user.comuna || null,
    role,
    createdAt: Date.now(),
  });
  saveUsers(list);

  return { ok: true };
}

/* =========================
 * (Opcional) utilidades CRUD
 * ========================= */

/**
 * Actualiza un usuario por email (si existe). Retorna { ok, error? }.
 * Útil si más adelante haces "Mi perfil".
 */
export function updateUserByEmail(email, patch) {
  const list = getUsers();
  const idx = list.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (idx === -1) return { ok: false, error: "Usuario no encontrado." };

  list[idx] = { ...list[idx], ...patch, updatedAt: Date.now() };
  saveUsers(list);
  return { ok: true };
}

/**
 * Elimina un usuario por email. Retorna { ok, deleted }.
 * (Normalmente esto sería tarea de un rol admin.)
 */
export function deleteUserByEmail(email) {
  const before = getUsers();
  const after = before.filter(
    (u) => u.email.toLowerCase() !== email.toLowerCase()
  );
  saveUsers(after);
  return { ok: true, deleted: before.length - after.length };
}
