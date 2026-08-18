import { cookies } from 'next/headers';
import { ApiError } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

/**
 * Server-only GET helper. Forwards the incoming request's cookies to the
 * Laravel API, plus an explicit Referer/Origin so Sanctum's
 * EnsureFrontendRequestsAreStateful middleware recognizes this as a
 * stateful (cookie-authenticated) request — a plain server-to-server fetch
 * carries neither header by default, which would otherwise make every
 * logged-in user look like a guest to the API.
 */
export async function serverApiGet<T>(path: string): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join('; ');

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      Cookie: cookieHeader,
      Referer: `${APP_URL}/`,
      Origin: APP_URL,
    },
    cache: 'no-store',
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await response.json() : undefined;

  if (!response.ok) {
    throw new ApiError(response.status, body?.message ?? response.statusText, body?.errors);
  }

  return body as T;
}

/** Like serverApiGet, but returns null on 401/404 instead of throwing. */
export async function serverApiGetOrNull<T>(path: string): Promise<T | null> {
  try {
    return await serverApiGet<T>(path);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 404)) {
      return null;
    }
    throw error;
  }
}
