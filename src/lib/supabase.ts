import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ApiKeyManager } from './apiKeyManager';

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

// Helper to determine active Supabase credentials
export const getSupabaseConfig = () => {
  const custom = ApiKeyManager.getCustomSupabaseConfig();
  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

  const url = custom.url || envUrl;
  const key = custom.anonKey || envKey;

  return { url, key, isConfigured: Boolean(url && key) };
};

// Returns an active Supabase client or null if not yet configured
export const getSupabase = (): SupabaseClient | null => {
  const { url, key, isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return null;
  }

  if (cachedClient && lastUrl === url && lastKey === key) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    });
    lastUrl = url;
    lastKey = key;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const isSupabaseConfigured = (): boolean => {
  return getSupabaseConfig().isConfigured;
};

// Listen for settings change
if (typeof window !== 'undefined') {
  window.addEventListener('examcraft-supabase-config-changed', () => {
    cachedClient = null;
    lastUrl = '';
    lastKey = '';
  });
}
