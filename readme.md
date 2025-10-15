# Cashier Offline-First Platform

Proyek ini menyediakan contoh arsitektur kasir offline/online berbasis **Vue 3 + TypeScript** pada sisi frontend dan **Laravel 12** pada sisi backend. Antarmuka menggunakan **Tailwind CSS 4** dengan komponen **shadcn-vue**, serta mendukung penyimpanan transaksi secara lokal ketika perangkat tidak terhubung ke internet.

## Struktur Proyek

```
.
├── backend/            # Layanan RESTful Laravel 12
├── frontend/           # Aplikasi kasir offline-first berbasis Vue 3
├── docs/               # Dokumentasi tambahan (alur & flowchart)
└── readme.md           # Berkas dokumentasi utama
```

## Fitur Utama

- **Transaksi offline-first** dengan antrean lokal berbasis IndexedDB.
- **Sinkronisasi otomatis** ketika koneksi internet kembali tersedia.
- **Antarmuka shadcn-vue** yang di-styling menggunakan Tailwind CSS 4 (versi alpha).
- **Integrasi Laravel 12** sebagai backend API dengan endpoint `transactions` dan health check.
- **Pengelolaan state** menggunakan Pinia + Persisted State untuk menjaga transaksi lokal.
- **Service worker PWA** untuk caching aset dasar dan memastikan aplikasi tetap dapat diakses saat offline.
- **Tema adaptif & personalisasi warna** dengan deteksi tema sistem layaknya ChatGPT, pilihan manual mode terang/gelap, serta selektor warna aksen.
- **Antarmuka multi-bahasa** dengan bahasa awal Indonesia dan opsi beralih ke bahasa Inggris secara langsung di aplikasi.

## Prasyarat

- Node.js 18+
- pnpm / npm / yarn
- PHP 8.2+
- Composer 2+
- SQLite (opsional) atau database lain yang dikonfigurasi di `.env`

## Menjalankan Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Buat file `.env` berdasarkan `.env.example` jika ingin mengubah endpoint API.

### Pemeriksaan Kode Frontend

```bash
pnpm lint
pnpm format
```

Perintah `lint` menjalankan ESLint untuk memeriksa potensi masalah pada berkas Vue dan TypeScript, sedangkan `format` menjalankan Prettier (beserta plugin Tailwind) untuk merapikan kode secara konsisten.

## Menjalankan Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Secara default backend menggunakan SQLite (`database/database.sqlite`). Pastikan file tersebut tersedia atau ganti konfigurasi database sesuai kebutuhan.

### Formatter Backend

```bash
composer format
```

Perintah di atas menjalankan **Laravel Pint** untuk memastikan gaya penulisan kode PHP tetap konsisten di seluruh proyek.

## Konfigurasi Nginx

Gunakan contoh konfigurasi berikut ketika men-deploy aplikasi ini di belakang Nginx. Berkas berada pada direktori `deploy/nginx`.

### Frontend (`deploy/nginx/frontend.conf`)

- Melayani aset build Vite dari `/var/www/frontend/dist`.
- Melakukan fallback ke `index.html` untuk seluruh rute SPA.
- Meneruskan request `/api/*` ke backend Laravel pada `http://backend:9000`.

### Backend (`deploy/nginx/backend.conf`)

- Mengarahkan domain `api.cashier.local` ke direktori `backend/public`.
- Menggunakan PHP-FPM socket `php8.2-fpm` dan meneruskan permintaan PHP via `fastcgi_pass`.
- Memblokir akses ke berkas `.ht*` dan menambahkan header keamanan dasar.

> **Catatan:** Sesuaikan `server_name`, lokasi root, maupun alamat upstream sesuai lingkungan server Anda (misal mengganti `backend:9000` dengan IP/hostname kontainer Laravel). Setelah menyalin berkas konfigurasi, aktifkan site menggunakan `ln -s` ke `/etc/nginx/sites-enabled/` dan lakukan `nginx -t` diikuti `systemctl reload nginx`.

## Arsitektur Sinkronisasi

1. **Input Transaksi** – Pengguna mengisi data transaksi dari dashboard kasir.
2. **Antrean Lokal** – Data disimpan ke Pinia dan IndexedDB melalui `useTransactionQueue`.
3. **Service Worker** – Menjaga aset penting tetap tersedia saat offline.
4. **Deteksi Koneksi** – `@vueuse/core` memantau status jaringan dan memicu sinkronisasi saat online.
5. **API Laravel** – Endpoint `POST /api/transactions` menerima payload transaksi dan menyimpannya pada database.
6. **Log & Monitoring** – Pengguna dapat melihat log sinkronisasi dan status koneksi di halaman `Pusat Sinkronisasi`.

## Pengaturan Tampilan & Bahasa

- **Mode Tema** – Pilih antara `Sistem`, `Terang`, atau `Gelap`. Mode sistem mengikuti preferensi OS/Browser secara otomatis.
- **Warna Aksen** – Tersedia beberapa palet (Emerald, Sapphire, Amber, Violet) untuk menyesuaikan warna utama aplikasi.
- **Bahasa Antarmuka** – Bahasa default adalah Indonesia. Gunakan menu `Language` pada navigasi untuk berganti ke bahasa Inggris; semua label, placeholder, dan log akan menyesuaikan secara realtime.

## Flowchart Alur Kerja

```mermaid
flowchart TD
    A[Mulai Transaksi di Dashboard] --> B{Koneksi Online?}
    B -- Tidak --> C[Simpan ke Pinia + IndexedDB]
    C --> D[Tandai Pending]
    D --> E{Koneksi Kembali?}
    E -- Ya --> F[Trigger Sinkronisasi]
    F --> G[POST /api/transactions]
    G --> H{Berhasil?}
    H -- Ya --> I[Update Status Synced]
    H -- Tidak --> J[Update Status Failed]
    I --> K[Catat Log Sinkronisasi]
    J --> K
    K --> L[Selesai]
    B -- Ya --> F
```

## Dokumentasi Tambahan

- [Detail Alur & Modul](docs/flow.md)
- [Tips Menghindari Konflik PR](docs/pr-troubleshooting.md)

## Lisensi

Proyek ini dapat digunakan sebagai referensi atau titik awal pengembangan sistem kasir offline/online.
