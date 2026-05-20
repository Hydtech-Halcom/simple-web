# Simple Web API

Project ini adalah API sederhana berbasis `Express`, `Drizzle ORM`, dan `Supabase Postgres`.

Panduan penting:

- `README.md` : gambaran umum project
- `SETUP.md` : langkah instalasi dari nol
- `QUICKSTART.md` : langkah cepat menjalankan project
- `API.md` : dokumentasi detail endpoint API
- `BELAJAR-PROJECT.md` : panduan pemula dari database sampai data tampil di halaman

Tujuan project:
- belajar struktur backend sederhana
- belajar koneksi database Supabase dengan Drizzle
- menyediakan endpoint `GET` dan `POST` untuk tabel `users` dan `devices`
- menyediakan seeder untuk data awal database

## Fitur

- API `users`
- API `devices`
- koneksi PostgreSQL ke Supabase
- skema database dengan Drizzle
- seeder data awal
- file statis dari folder `public`
- halaman web sederhana untuk lihat data, cari data, dan kirim data

## Teknologi

- Node.js
- Express
- Drizzle ORM
- Drizzle Kit
- Supabase Postgres
- Postgres.js

## Arsitektur Project

Project ini punya alur kerja sederhana seperti ini:

```text
Browser
  |
  v
public/index.html + public/index.js
  |
  v
Express Server (index.js)
  |
  v
Route Handler (src/routes)
  |
  v
Drizzle ORM (src/db)
  |
  v
Supabase Postgres
```

Penjelasan singkat:

- `public/index.html` menampilkan halaman di browser
- `public/index.js` mengambil data dari API dan mengirim data dari form
- `index.js` menjalankan server Express dan mendaftarkan endpoint
- `src/routes/` berisi logika `GET` dan `POST`
- `src/db/` berisi koneksi database dan skema tabel
- `Supabase Postgres` menyimpan data project

### Alur Endpoint Users

#### GET `/api/users`

```text
Browser / Insomnia
  |
  v
GET /api/users
  |
  v
index.js
  |
  v
getUsers() di src/routes/users.js
  |
  v
db.select().from(userTable)
  |
  v
Supabase Postgres
  |
  v
Response JSON daftar users
```

#### GET `/api/users/:id`

```text
Browser / Insomnia
  |
  v
GET /api/users/:id
  |
  v
index.js
  |
  v
getUserById() di src/routes/users.js
  |
  v
db.select().from(userTable).where(...)
  |
  v
Supabase Postgres
  |
  v
Response JSON satu user
```

#### POST `/api/users`

```text
Browser Form / Insomnia
  |
  v
POST /api/users
Body: { "username": "budi" }
  |
  v
index.js
  |
  v
createUser() di src/routes/users.js
  |
  +--> validasi username
  |
  v
db.insert(userTable).values({ username })
  |
  v
Supabase Postgres
  |
  v
Response JSON user baru
```

### Alur Endpoint Devices

#### GET `/api/devices`

```text
Browser / Insomnia
  |
  v
GET /api/devices
  |
  v
index.js
  |
  v
getDevices() di src/routes/devices.js
  |
  v
db.select().from(deviceTable)
  |
  v
Supabase Postgres
  |
  v
Response JSON daftar devices
```

#### GET `/api/devices/:id`

```text
Browser / Insomnia
  |
  v
GET /api/devices/:id
  |
  v
index.js
  |
  v
getDeviceById() di src/routes/devices.js
  |
  v
db.select().from(deviceTable).where(...)
  |
  v
Supabase Postgres
  |
  v
Response JSON satu device
```

#### POST `/api/devices`

```text
Browser Form / Insomnia
  |
  v
POST /api/devices
Body: { "name": "Sensor A", "status": "online" }
  |
  v
index.js
  |
  v
createDevice() di src/routes/devices.js
  |
  +--> validasi name
  +--> isi default status jika kosong
  +--> isi updated_at otomatis
  |
  v
db.insert(deviceTable).values(...)
  |
  v
Supabase Postgres
  |
  v
Response JSON device baru
```

### Alur Dari Halaman Browser

Saat membuka `http://localhost:3000`, alurnya seperti ini:

```text
Browser buka /
  |
  v
Express mengirim public/index.html
  |
  v
Browser memuat public/index.js
  |
  v
refreshAll()
  |
  +--> fetch GET /api/users
  |
  +--> fetch GET /api/devices
  |
  v
Data tampil di halaman
```

Saat form dikirim dari halaman browser:

```text
User isi form
  |
  v
public/index.js membaca input
  |
  v
fetch POST ke API
  |
  v
Route Express menyimpan ke database
  |
  v
Response JSON ditampilkan
  |
  v
Daftar data dimuat ulang
```

## Struktur Folder

```text
simple-web/
|- drizzle/
|- public/
|- src/
|  |- db/
|  |  |- index.js
|  |  |- schema.js
|  |- routes/
|  |  |- devices.js
|  |  |- users.js
|  |- seed.js
|- .env.example
|- drizzle.config.js
|- API.md
|- BELAJAR-PROJECT.md
|- index.js
|- package.json
|- QUICKSTART.md
|- README.md
|- SETUP.md
```

## Database

Project ini memakai 2 tabel:

### `users`

- `id` : uuid, primary key
- `username` : varchar(100), wajib diisi

### `devices`

- `id` : uuid, primary key
- `name` : varchar(100), wajib diisi
- `status` : enum `online | offline | deleted`
- `installed_at` : timestamp
- `updated_at` : timestamp

## Endpoint API

Dokumentasi singkat endpoint ada di bagian ini.

Untuk dokumentasi API yang lebih detail, buka:

```text
API.md
```

### Users

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| `GET` | `/api/users` | Ambil semua user |
| `GET` | `/api/users/:id` | Ambil 1 user berdasarkan id |
| `POST` | `/api/users` | Tambah user baru |

Contoh body `POST /api/users`:

```json
{
  "username": "budi"
}
```

### Devices

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| `GET` | `/api/devices` | Ambil semua device |
| `GET` | `/api/devices/:id` | Ambil 1 device berdasarkan id |
| `POST` | `/api/devices` | Tambah device baru |

Contoh body `POST /api/devices`:

```json
{
  "name": "Sensor Gudang",
  "status": "online"
}
```

Ringkasan endpoint:

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| `GET` | `/api/users` | Ambil semua user |
| `GET` | `/api/users/:id` | Ambil user berdasarkan id |
| `POST` | `/api/users` | Tambah user baru |
| `GET` | `/api/devices` | Ambil semua device |
| `GET` | `/api/devices/:id` | Ambil device berdasarkan id |
| `POST` | `/api/devices` | Tambah device baru |

Dokumentasi detail di `API.md` mencakup:
- request method
- URL endpoint
- contoh body JSON
- contoh response sukses
- contoh response error
- penjelasan field input

## Testing API Dengan Insomnia

Insomnia adalah aplikasi untuk mencoba API dengan tampilan yang lebih mudah dipahami dibanding terminal.

Download Insomnia:

```text
https://insomnia.rest/download
```

## Cara Test API Di Insomnia

1. Install Insomnia dari link di atas.
2. Jalankan server project:

```bash
npm run dev
```

3. Buka Insomnia.
4. Klik `Create` lalu buat request baru.
5. Pilih method sesuai kebutuhan: `GET` atau `POST`.
6. Isi URL endpoint API.
7. Untuk request `POST`, pilih tab `Body` lalu pilih `JSON`.
8. Masukkan body JSON.
9. Klik `Send`.

Untuk detail semua endpoint saat testing di Insomnia, lihat juga `API.md`.

## Contoh Test GET Di Insomnia

### GET semua users

- Method: `GET`
- URL: `http://localhost:3000/api/users`

### GET user berdasarkan id

- Method: `GET`
- URL: `http://localhost:3000/api/users/ID_USER`

Contoh:

```text
http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

### GET semua devices

- Method: `GET`
- URL: `http://localhost:3000/api/devices`

### GET device berdasarkan id

- Method: `GET`
- URL: `http://localhost:3000/api/devices/ID_DEVICE`

## Contoh Test POST Di Insomnia

### POST user baru

- Method: `POST`
- URL: `http://localhost:3000/api/users`
- Header: `Content-Type: application/json`

Body JSON:

```json
{
  "username": "budi"
}
```

### POST device baru

- Method: `POST`
- URL: `http://localhost:3000/api/devices`
- Header: `Content-Type: application/json`

Body JSON minimal:

```json
{
  "name": "Sensor Kantor"
}
```

Body JSON lengkap:

```json
{
  "name": "Sensor Kantor",
  "status": "online",
  "installed_at": "2026-05-20T10:00:00.000Z"
}
```

## Contoh Response Yang Akan Muncul

### Response sukses GET

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-user",
      "username": "johndoe"
    }
  ]
}
```

### Response sukses POST

```json
{
  "success": true,
  "data": {
    "id": "uuid-baru",
    "username": "budi"
  }
}
```

### Response error validasi

```json
{
  "success": false,
  "error": "Username is required"
}
```

## Seeder

Seeder tersedia di file `src/seed.js`.

Seeder akan menambahkan:
- 5 data ke tabel `users`
- 5 data ke tabel `devices`

Jalankan dengan:

```bash
npm run db:seed
```

## Menjalankan Project

Untuk langkah lengkap, baca:

1. `SETUP.md` untuk instalasi dari nol
2. `QUICKSTART.md` untuk jalankan project secepat mungkin
3. `BELAJAR-PROJECT.md` untuk memahami alur project dari awal

Perintah utama:

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Server berjalan di:

```text
http://localhost:3000
```

Halaman web sederhana bisa dibuka di:

```text
http://localhost:3000
```

Catatan penting untuk pemula:

- file `public/index.html` tidak dijalankan dengan double click langsung
- file tersebut disajikan oleh server Express dari folder `public`
- jadi cara yang benar adalah menjalankan server dulu, lalu buka `http://localhost:3000`

Endpoint API utama bisa dicoba di:

```text
http://localhost:3000/api/users
http://localhost:3000/api/devices
```

## Scripts

| Script | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server dengan nodemon |
| `npm start` | Menjalankan server biasa |
| `npm run db:generate` | Generate file migration dari skema |
| `npm run db:migrate` | Menjalankan migration yang sudah dibuat |
| `npm run db:push` | Push skema langsung ke database |
| `npm run db:studio` | Membuka Drizzle Studio |
| `npm run db:seed` | Mengisi data awal ke database |

## Catatan

- pastikan `DATABASE_URL` di file `.env` valid
- project ini belum memakai autentikasi
- project ini belum memiliki endpoint `PUT`, `PATCH`, atau `DELETE`
- jika seed dijalankan berkali-kali, data akan terus bertambah
