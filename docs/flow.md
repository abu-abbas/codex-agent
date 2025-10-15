# Alur Kerja Cashier Offline-First

## 1. Frontend (Vue 3 + TypeScript)
- **Dashboard Kasir** (`CashierDashboard.vue`)
  - Form transaksi menggunakan komponen shadcn-vue (Button, Card, Input, Textarea).
  - Mengirim data ke `useTransactionQueue`.
- **Pusat Sinkronisasi** (`SyncCenter.vue`)
  - Memantau status koneksi (`@vueuse/core`).
  - Menampilkan log sinkronisasi dan ringkasan transaksi pending.
- **Pengaturan Tampilan**
  - `MainLayout.vue` menyediakan selektor tema (System/Light/Dark) dengan deteksi otomatis preferensi perangkat.
  - Pilihan warna aksen (emerald, sapphire, amber, violet) mengubah palet CSS variable secara realtime.
  - Integrasi `vue-i18n` menampilkan konten dalam bahasa Indonesia atau Inggris sesuai pilihan pengguna.
- **State Management**
  - `Pinia` menyimpan seluruh transaksi, dengan persistensi ke `localStorage`.
  - `useTransactionQueue` menaruh transaksi ke IndexedDB (`idb-keyval`) dan memicu sinkronisasi.
- **Service Worker**
  - Cache aset penting (`index.html`, manifest) agar aplikasi dapat terus digunakan ketika offline.

## 2. Backend (Laravel 12)
- **Endpoint**
  - `POST /api/transactions` untuk menerima transaksi dari antrean lokal.
  - `GET /api/transactions` untuk membaca transaksi yang telah tersinkronisasi.
- **Model & Migrasi**
  - `Transaction` menyimpan `external_id`, `customer_name`, `amount`, `notes`, dan `transacted_at`.
  - Migrasi menyiapkan tabel dengan dukungan soft delete.
- **Resource**
  - `TransactionResource` memastikan respons API konsisten dengan struktur yang diharapkan frontend.
- **Keamanan**
  - CORS mengizinkan permintaan dari frontend (`FRONTEND_URL`).
  - Laravel Sanctum disiapkan untuk autentikasi apabila diperlukan.

## 3. Sinkronisasi Offline-Online
1. Pengguna membuat transaksi saat offline.
2. Transaksi disimpan di Pinia dan IndexedDB.
3. Ketika koneksi kembali, `useTransactionQueue` melakukan iterasi dan `POST` ke backend.
4. Respons sukses mengubah status transaksi menjadi `synced`.
5. Kegagalan akan menandai transaksi sebagai `failed` untuk diulang.
6. Riwayat sinkronisasi dicatat pada `syncLog` dan ditampilkan di UI.

## 4. Pengembangan & Pengujian
- **Frontend**
  - `pnpm dev` untuk menjalankan Vite dev server.
  - `pnpm build` menghasilkan bundle production.
- **Backend**
  - `php artisan migrate` untuk menyiapkan database.
  - `php artisan test` menjalankan pengujian.

## 5. Deployment
- Jalankan build frontend (`pnpm build`) dan sajikan file statis (misal via Nginx).
- Deploy backend Laravel ke server PHP dengan konfigurasi environment yang sama (APP_KEY, database, dll).
- Pastikan domain frontend ditambahkan ke `FRONTEND_URL` agar CORS tetap valid.
