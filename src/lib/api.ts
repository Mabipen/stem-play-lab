const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }

  fieldError(field: string): string | undefined {
    return this.errors?.[field]?.[0];
  }
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

let csrfCookiePromise: Promise<void> | null = null;

function ensureCsrfCookie(): Promise<void> {
  if (!csrfCookiePromise) {
    csrfCookiePromise = fetch(`${API_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    }).then(() => undefined);
  }
  return csrfCookiePromise;
}

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase();

  if (MUTATING_METHODS.has(method)) {
    await ensureCsrfCookie();
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  if (MUTATING_METHODS.has(method)) {
    const token = readCookie('XSRF-TOKEN');
    if (token) headers['X-XSRF-TOKEN'] = token;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    method,
    headers,
    credentials: 'include',
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await response.json() : undefined;

  if (!response.ok) {
    throw new ApiError(response.status, body?.message ?? response.statusText, body?.errors);
  }

  return body as T;
}

export function apiGet<T>(path: string): Promise<T> {
  return apiFetch<T>(path, { method: 'GET' });
}

export function apiPost<T>(path: string, data?: unknown): Promise<T> {
  return apiFetch<T>(path, { method: 'POST', body: data !== undefined ? JSON.stringify(data) : undefined });
}

export function apiPut<T>(path: string, data?: unknown): Promise<T> {
  return apiFetch<T>(path, { method: 'PUT', body: data !== undefined ? JSON.stringify(data) : undefined });
}

export function apiDelete<T>(path: string): Promise<T> {
  return apiFetch<T>(path, { method: 'DELETE' });
}
