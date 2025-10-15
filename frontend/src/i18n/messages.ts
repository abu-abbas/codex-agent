export const messages = {
  id: {
    app: {
      name: 'Cashier+',
      tagline: 'Vue 3 • Laravel 12 • Tailwind 4'
    },
    nav: {
      dashboard: 'Dasbor',
      sync: 'Sinkronisasi',
      theme: 'Tema',
      accent: 'Aksen',
      language: 'Bahasa',
      system: 'Sistem',
      light: 'Terang',
      dark: 'Gelap',
      indonesian: 'Indonesia',
      english: 'Inggris',
      online: 'Online',
      offline: 'Offline'
    },
    dashboard: {
      title: 'Kasir Offline/Online',
      subtitle:
        'Kelola transaksi secara realtime atau simpan ketika offline lalu sinkronkan ketika koneksi kembali.',
      syncCenter: 'Pusat Sinkronisasi',
      newTransaction: 'Transaksi Baru',
      customerName: 'Nama Pelanggan',
      amount: 'Total Pembayaran',
      notes: 'Catatan',
      notesPlaceholder: 'opsional',
      clear: 'Bersihkan',
      save: 'Simpan',
      localHistory: 'Riwayat Transaksi Lokal',
      pendingCount: '{count} transaksi antri sinkronisasi',
      noNotes: 'Tanpa catatan',
      createdAt: 'Dibuat',
      empty: 'Belum ada transaksi offline.'
    },
    sync: {
      title: 'Pusat Sinkronisasi',
      subtitle: 'Kelola transaksi yang tersimpan lokal dan pantau status sinkronisasi dengan server Laravel.',
      back: 'Kembali',
      connectionStatus: 'Status Koneksi',
      online: 'Online',
      offline: 'Offline',
      description:
        'Transaksi akan otomatis dikirim ketika koneksi tersedia. Anda juga dapat memaksakan sinkronisasi manual.',
      syncing: 'Sinkronisasi...',
      syncNow: 'Sinkronkan Sekarang',
      summary: 'Ringkasan Pending',
      pendingCount: 'transaksi menunggu sinkronisasi',
      totalAmount: 'Total nominal',
      lastSynced: 'Terakhir sinkron',
      never: 'Belum pernah',
      logTitle: 'Log Sinkronisasi',
      logEmpty: 'Belum ada aktivitas sinkronisasi.'
    },
    queue: {
      saved: 'Transaksi {name} tersimpan lokal',
      none: 'Tidak ada transaksi untuk sinkronisasi',
      syncSuccess: '{count} transaksi berhasil disinkronkan',
      syncError: '{count} transaksi gagal disinkronkan',
      status: {
        info: 'Info',
        success: 'Berhasil',
        error: 'Gagal'
      }
    },
    formatting: {
      currency: 'IDR',
      locale: 'id-ID',
      datetime: 'id-ID'
    },
    accent: {
      emerald: 'Emerald',
      sapphire: 'Sapphire',
      amber: 'Amber',
      violet: 'Violet'
    }
  },
  en: {
    app: {
      name: 'Cashier+',
      tagline: 'Vue 3 • Laravel 12 • Tailwind 4'
    },
    nav: {
      dashboard: 'Dashboard',
      sync: 'Sync Center',
      theme: 'Theme',
      accent: 'Accent',
      language: 'Language',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
      indonesian: 'Indonesian',
      english: 'English',
      online: 'Online',
      offline: 'Offline'
    },
    dashboard: {
      title: 'Offline/Online Cashier',
      subtitle:
        'Manage transactions in real-time or keep them offline and sync when the connection returns.',
      syncCenter: 'Sync Center',
      newTransaction: 'New Transaction',
      customerName: 'Customer Name',
      amount: 'Total Payment',
      notes: 'Notes',
      notesPlaceholder: 'optional',
      clear: 'Clear',
      save: 'Save',
      localHistory: 'Local Transaction History',
      pendingCount: '{count} transactions queued for sync',
      noNotes: 'No notes',
      createdAt: 'Created',
      empty: 'No offline transactions yet.'
    },
    sync: {
      title: 'Sync Center',
      subtitle: 'Manage locally stored transactions and monitor sync status with the Laravel server.',
      back: 'Back',
      connectionStatus: 'Connection Status',
      online: 'Online',
      offline: 'Offline',
      description:
        'Transactions will be sent automatically when a connection is available. You can also trigger a manual sync.',
      syncing: 'Syncing...',
      syncNow: 'Sync Now',
      summary: 'Pending Summary',
      pendingCount: 'transactions waiting for sync',
      totalAmount: 'Total amount',
      lastSynced: 'Last synced',
      never: 'Never',
      logTitle: 'Sync Log',
      logEmpty: 'No sync activity yet.'
    },
    queue: {
      saved: 'Transaction {name} stored locally',
      none: 'No transactions to synchronise',
      syncSuccess: '{count} transactions synced successfully',
      syncError: '{count} transactions failed to sync',
      status: {
        info: 'Info',
        success: 'Success',
        error: 'Error'
      }
    },
    formatting: {
      currency: 'IDR',
      locale: 'en-ID',
      datetime: 'en-US'
    },
    accent: {
      emerald: 'Emerald',
      sapphire: 'Sapphire',
      amber: 'Amber',
      violet: 'Violet'
    }
  }
} as const;

export type MessageSchema = typeof messages['id'];
