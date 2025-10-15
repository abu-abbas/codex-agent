import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from '@pinia/plugin-persistedstate';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import './index.css';
import { registerSW } from './registerServiceWorker';
import { messages } from './i18n/messages';
import { useSettingsStore } from './store/settingsStore';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);

const i18n = createI18n({
  legacy: false,
  locale: 'id',
  fallbackLocale: 'en',
  messages
});

const settingsStore = useSettingsStore(pinia);
i18n.global.locale.value = settingsStore.locale;

watch(
  () => settingsStore.locale,
  (locale) => {
    i18n.global.locale.value = locale;
  },
  { immediate: false }
);

app.use(i18n);

registerSW();

app.mount('#app');
