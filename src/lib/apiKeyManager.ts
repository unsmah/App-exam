// Storage and validation manager for User's Gemini API Key

const GEMINI_KEY_STORAGE_KEY = 'examcraft_gemini_api_key';
const SUPABASE_URL_KEY = 'examcraft_supabase_url';
const SUPABASE_KEY_KEY = 'examcraft_supabase_anon_key';

export const ApiKeyManager = {
  // Gemini API Key
  getGeminiKey(): string {
    try {
      const stored = localStorage.getItem(GEMINI_KEY_STORAGE_KEY);
      if (stored && stored.trim()) return stored.trim();
    } catch {
      // ignore
    }
    // Fallback to client env if specified
    return (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
  },

  setGeminiKey(key: string): void {
    if (!key || !key.trim()) {
      localStorage.removeItem(GEMINI_KEY_STORAGE_KEY);
    } else {
      localStorage.setItem(GEMINI_KEY_STORAGE_KEY, key.trim());
    }
    window.dispatchEvent(new CustomEvent('examcraft-api-key-changed', { detail: { key: key.trim() } }));
  },

  hasGeminiKey(): boolean {
    return Boolean(this.getGeminiKey());
  },

  removeGeminiKey(): void {
    localStorage.removeItem(GEMINI_KEY_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('examcraft-api-key-changed', { detail: { key: '' } }));
  },

  // Supabase Config overrides from UI
  getCustomSupabaseConfig(): { url: string; anonKey: string } {
    try {
      const url = localStorage.getItem(SUPABASE_URL_KEY) || (import.meta.env.VITE_SUPABASE_URL as string) || '';
      const anonKey = localStorage.getItem(SUPABASE_KEY_KEY) || (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';
      return { url: url.trim(), anonKey: anonKey.trim() };
    } catch {
      return { url: '', anonKey: '' };
    }
  },

  setCustomSupabaseConfig(url: string, anonKey: string): void {
    if (url) localStorage.setItem(SUPABASE_URL_KEY, url.trim());
    else localStorage.removeItem(SUPABASE_URL_KEY);

    if (anonKey) localStorage.setItem(SUPABASE_KEY_KEY, anonKey.trim());
    else localStorage.removeItem(SUPABASE_KEY_KEY);

    window.dispatchEvent(new CustomEvent('examcraft-supabase-config-changed'));
  }
};
