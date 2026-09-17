/**
 * auth.ts — Centralised RBAC permission helpers.
 *
 * Single source of truth for role checks across the frontend.
 * Import these functions instead of duplicating role logic in components.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type AppRole = 'admin' | 'operator';

export interface CurrentUser {
  id?: string;
  email: string;
  displayName: string;
  roleId?: string;
  /** Resolved role name returned by the login endpoint (e.g. "admin" | "operator") */
  roleName: AppRole;
}

// ── Routes that require ADMIN ─────────────────────────────────────────────────

/** URL prefixes that only ADMIN may access. */
export const ADMIN_ONLY_ROUTES: readonly string[] = ['/reports', '/audit-logs'];

// ── User helpers ──────────────────────────────────────────────────────────────

/**
 * Returns the stored CurrentUser from localStorage, or null if not logged in.
 * Reads the same key that api.ts setCurrentUser() writes.
 */
export function getCurrentUser(): CurrentUser | null {
  try {
    const raw = localStorage.getItem('currentUser');
    return raw ? (JSON.parse(raw) as CurrentUser) : null;
  } catch {
    return null;
  }
}

/** Returns the current user's role, or null. */
export function getUserRole(): AppRole | null {
  return getCurrentUser()?.roleName ?? null;
}

/** Returns true when the authenticated user has the ADMIN role. */
export function isAdmin(): boolean {
  return getUserRole() === 'admin';
}

/** Returns true when the authenticated user has the OPERATOR role. */
export function isOperator(): boolean {
  return getUserRole() === 'operator';
}

/** Returns true when the authenticated user has the given role. */
export function hasRole(role: AppRole): boolean {
  return getUserRole() === role;
}

// ── Display helpers ───────────────────────────────────────────────────────────

/**
 * Returns a human-friendly label for a role.
 *   "admin"    → "Administrator"
 *   "operator" → "Operator"
 *   null       → "Guest"
 */
export function getRoleLabel(role: AppRole | null | undefined): string {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'operator':
      return 'Operator';
    default:
      return 'Guest';
  }
}

// ── Route guard helper ────────────────────────────────────────────────────────

/**
 * Returns true when the given role is permitted to access the route.
 * Admin-only routes require the "admin" role; all other routes are
 * accessible to any authenticated user.
 */
export function canAccessRoute(route: string, role: AppRole | null): boolean {
  if (ADMIN_ONLY_ROUTES.some((r) => route.startsWith(r))) {
    return role === 'admin';
  }
  return true;
}
