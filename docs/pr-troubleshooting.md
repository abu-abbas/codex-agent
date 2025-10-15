# Penyebab Konflik Pull Request Berulang

Konflik terjadi karena cabang kerja (`work`) tidak diselaraskan dengan cabang utama (`main`) sebelum membuat perubahan baru. Ketika isi repositori di cabang utama berbeda jauh—misalnya ada commit lain yang juga mengubah struktur frontend atau backend—Git tidak bisa menentukan versi mana yang benar sehingga menandai file-file tersebut sebagai konflik.

## Gejala yang Terlihat

- PR menampilkan perubahan masif (ribuan baris) meski hanya ada sedikit modifikasi terbaru.
- File yang sama ditambahkan ulang atau dihapus, padahal sudah ada di cabang utama.
- Merge base PR tertinggal beberapa commit dari cabang utama.

## Cara Menghindari

1. **Perbarui cabang utama lokal**
   ```bash
   git fetch origin
   git checkout main
   git pull --ff-only
   ```
2. **Rebase cabang fitur di atas `main` terbaru**
   ```bash
   git checkout work
   git rebase main
   ```
   Selesaikan konflik jika muncul, lalu lanjutkan `rebase` dengan `git rebase --continue`.
3. **Gunakan cabang baru untuk setiap pekerjaan**
   ```bash
   git checkout main
   git pull --ff-only
   git checkout -b fitur/tema-baru
   ```
   Dengan cara ini, PR hanya berisi perubahan yang relevan.
4. **Periksa diff sebelum push** dengan `git status` dan `git diff` untuk memastikan tidak ada file yang berubah di luar kebutuhan.

## Tips Tambahan

- Hindari membuat `git init` atau menyalin ulang seluruh proyek di dalam cabang yang sama, karena hal tersebut membuat Git menganggap semua file berubah.
- Jika PR sudah terlanjur conflict berat, buat cabang baru dari `main` terbaru dan cherry-pick commit yang valid.
- Jalankan `pnpm lint` dan `composer format` setelah menyelesaikan konflik untuk memastikan style konsisten.

Dengan langkah di atas, PR akan tetap kecil dan mudah di-review tanpa konflik berulang.
