import { ApiKeyManager } from './apiKeyManager';

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const customKey = ApiKeyManager.getGeminiKey();
  
  const headers = new Headers(init?.headers || {});
  if (customKey && !headers.has('x-gemini-api-key')) {
    headers.set('x-gemini-api-key', customKey);
  }
  if (!headers.has('Content-Type') && init?.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(input, {
    ...init,
    headers
  });
}
