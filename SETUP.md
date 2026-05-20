# Setup Project

Panduan ini menjelaskan cara setup project dari nol untuk pemula.

## 1. Persiapan

Sebelum mulai, pastikan sudah ada:

- Node.js versi 18 atau lebih baru
- npm
- project Supabase
- koneksi database Supabase dalam bentuk `DATABASE_URL`

Untuk cek Node.js:

```bash
node -v
npm -v
```

## 2. Install Dependency

Jalankan:

```bash
npm install
```

Perintah ini akan memasang semua package yang dibutuhkan project.

## 3. Buat File Environment

Copy file `.env.example` menjadi `.env`.

Isi `.env` seperti ini:

```env
DATABASE_URL="your_database_url_here"
```

Ganti `your_database_url_here` dengan connection string dari Supabase.

## 4. Pahami Skema Database

Skema database ada di file:

```text
src/db/schema.js
```

Di sana ada 2 tabel:
- `users`
- `devices`

## 5. Kirim Skema ke Database

Cara paling cepat untuk project ini:

```bash
npm run db:push
```

Perintah ini akan membuat atau menyesuaikan tabel di database sesuai skema Drizzle.

Kalau ingin alur migration manual, bisa pakai:

```bash
npm run db:generate
npm run db:migrate
```

Untuk pemula, `db:push` biasanya lebih sederhana.

## 6. Isi Data Awal

Jalankan:

```bash
npm run db:seed
```

Perintah ini akan mengisi minimal 5 data untuk tiap tabel.

## 7. Jalankan Server

Mode development:

```bash
npm run dev
```

Mode biasa:

```bash
npm start
```

Jika berhasil, server akan jalan di:

```text
http://localhost:3000
```

Halaman web utama juga bisa dibuka di alamat yang sama.

## 8. Coba Endpoint

Contoh cek semua user:

```bash
curl http://localhost:3000/api/users
```

Contoh tambah user:

```bash
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"username":"budi"}'
```

Contoh cek semua device:

```bash
curl http://localhost:3000/api/devices
```

Contoh tambah device:

```bash
curl -X POST http://localhost:3000/api/devices -H "Content-Type: application/json" -d '{"name":"Sensor Baru","status":"online"}'
```

## 9. Jika Error

Beberapa masalah yang sering terjadi:

### `DATABASE_URL` salah

Solusi:
- cek isi file `.env`
- pastikan format connection string benar
- pastikan database Supabase bisa diakses

### tabel belum ada

Solusi:

```bash
npm run db:push
```

### seed gagal

Solusi:
- cek apakah database sudah dibuat
- cek apakah koneksi berhasil
- baca pesan error di terminal

## 10. File Penting

| File | Fungsi |
| --- | --- |
| `index.js` | Entry point server |
| `src/db/index.js` | Koneksi database |
| `src/db/schema.js` | Skema tabel |
| `src/routes/users.js` | Endpoint users |
| `src/routes/devices.js` | Endpoint devices |
| `src/seed.js` | Seeder data awal |
| `drizzle.config.js` | Konfigurasi Drizzle Kit |
