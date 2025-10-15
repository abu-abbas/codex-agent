import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { usePreferredDark } from '@vueuse/core';

type ThemeMode = 'system' | 'light' | 'dark';
export type LocaleKey = 'id' | 'en';

type AccentPreset = {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  ring?: string;
};

const accentPresets = {
  emerald: {
    primary: '160 84% 39%',
    primaryForeground: '0 0% 100%',
    accent: '160 84% 39%',
    accentForeground: '0 0% 100%'
  },
  sapphire: {
    primary: '221 83% 53%',
    primaryForeground: '210 40% 98%',
    accent: '221 83% 53%',
    accentForeground: '210 40% 98%'
  },
  amber: {
    primary: '37 92% 50%',
    primaryForeground: '24 10% 10%',
    accent: '37 92% 50%',
    accentForeground: '24 10% 10%'
  },
  violet: {
    primary: '262 83% 58%',
    primaryForeground: '210 40% 98%',
    accent: '262 83% 58%',
    accentForeground: '210 40% 98%'
  }
} satisfies Record<string, AccentPreset>;

export type AccentKey = keyof typeof accentPresets;
export const ACCENT_PRESETS: Record<AccentKey, AccentPreset> = accentPresets;

const FALLBACK_LOCALE: Record<LocaleKey, string> = {
  id: 'id',
  en: 'en'
};

export const useSettingsStore = defineStore('settings', () => {
  const themeMode = ref<ThemeMode>('system');
  const accent = ref<AccentKey>('emerald');
  const locale = ref<LocaleKey>('id');

  const preferredDark = usePreferredDark();

  const resolvedTheme = computed<'light' | 'dark'>(() => {
    if (themeMode.value === 'system') {
      return preferredDark.value ? 'dark' : 'light';
    }

    return themeMode.value;
  });

  const applyThemeClass = (theme: 'light' | 'dark') => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  };

  const applyAccentPalette = (accentKey: AccentKey) => {
    if (typeof document === 'undefined') {
      return;
    }

    const palette = ACCENT_PRESETS[accentKey];
    const root = document.documentElement;

    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--primary-foreground', palette.primaryForeground);
    root.style.setProperty('--accent', palette.accent);
    root.style.setProperty('--accent-foreground', palette.accentForeground);
    root.style.setProperty('--ring', palette.ring ?? palette.primary);
  };

  const applyLocale = (lang: LocaleKey) => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = FALLBACK_LOCALE[lang];
  };

  watch(resolvedTheme, (theme) => applyThemeClass(theme), { immediate: true });
  watch(accent, (accentKey) => applyAccentPalette(accentKey), { immediate: true });
  watch(locale, (lang) => applyLocale(lang), { immediate: true });

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode;
  };

  const setAccent = (accentKey: AccentKey) => {
    accent.value = accentKey;
  };

  const setLocale = (lang: LocaleKey) => {
    locale.value = lang;
  };

  return {
    themeMode,
    accent,
    locale,
    resolvedTheme,
    setThemeMode,
    setAccent,
    setLocale
  };
}, {
  persist: {
    storage: localStorage,
    paths: ['themeMode', 'accent', 'locale']
  }
});
