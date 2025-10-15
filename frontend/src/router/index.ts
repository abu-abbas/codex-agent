import { createRouter, createWebHistory } from 'vue-router';
import CashierDashboard from '@/pages/CashierDashboard.vue';
import SyncCenter from '@/pages/SyncCenter.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: CashierDashboard
  },
  {
    path: '/sync',
    name: 'sync',
    component: SyncCenter
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
