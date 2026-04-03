import { AUTH_LEGACY_STORAGE_KEY, AUTH_STORAGE_KEY } from "./consts";
import type { AuthSession } from "./types";

let authSessionCache: AuthSession | null = null;

function hasWindow() {
  return typeof window !== "undefined";
}

export function loadStoredAuthSession(): AuthSession | null {
  if (authSessionCache) {
    return authSessionCache;
  }

  if (!hasWindow()) {
    return null;
  }

  const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!storedValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedValue) as AuthSession;
    if (!parsed?.token || !parsed?.user) {
      clearStoredAuthSession();
      return null;
    }

    authSessionCache = parsed;
    return parsed;
  } catch {
    clearStoredAuthSession();
    return null;
  }
}

export function saveStoredAuthSession(session: AuthSession) {
  authSessionCache = session;

  if (!hasWindow()) {
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  localStorage.removeItem(AUTH_LEGACY_STORAGE_KEY);
}

export function clearStoredAuthSession() {
  authSessionCache = null;

  if (!hasWindow()) {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_LEGACY_STORAGE_KEY);
}

export function getStoredAccessToken(): string | null {
  return loadStoredAuthSession()?.token ?? null;
}