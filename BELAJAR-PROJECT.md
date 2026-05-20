# Belajar Project Ini

Navigasi:

- [`README.md`](./README.md)
- [`SETUP.md`](./SETUP.md)
- [`QUICKSTART.md`](./QUICKSTART.md)
- [`API.md`](./API.md)
- [`ALUR-ENDPOINT.md`](./ALUR-ENDPOINT.md)


Panduan ini dibuat untuk pemula yang ingin paham alur project dari awal:

1. database disiapkan
2. tabel dibuat
3. data awal dimasukkan
4. server dijalankan
5. data ditampilkan di browser
6. data baru dikirim ke server

## Peta Belajar Singkat

Kalau ingin super singkat, pahami urutan ini:

```text
.env -> src/db/index.js -> src/db/schema.js -> index.js -> src/routes -> public/
```

Artinya:

1. `.env`
   Menyimpan alamat koneksi database.
2. `src/db/index.js`
   Membuat koneksi ke Supabase Postgres.
3. `src/db/schema.js`
   Menjelaskan skema tabel.
4. `index.js`
   Menjalankan server Express.
5. `src/routes/`
   Menangani request API.
6. `public/`
   Menampilkan data ke browser dan mengirim form ke API.

## Gambaran Besar

Project ini punya 4 bagian utama:

1. `Supabase Postgres`
   Menyimpan data di database.
2. `Drizzle ORM`
   Menghubungkan kode JavaScript dengan tabel di database.
3. `Express`
   Menyediakan endpoint API seperti `/api/users` dan `/api/devices`.
4. `public/`
   Halaman web sederhana yang memanggil API untuk menampilkan dan mengirim data.

Alur sederhananya:

```text
Browser -> Express API -> Drizzle ORM -> Supabase Postgres
```

Diagram lebih detail:

```text
public/index.html
        |
        v
public/index.js
        |
        | fetch("/api/users") atau fetch("/api/devices")
        v
index.js
        |
        v
src/routes/users.js atau src/routes/devices.js
        |
        v
src/db/index.js
        |
        v
Supabase Postgres
```

Saat ambil data:

```text
Browser minta data -> API baca database -> data dikembalikan ke browser
```

Saat kirim data:

```text
Browser kirim form -> API validasi -> simpan ke database -> hasil dikembalikan ke browser
```

Diagram kirim data:

```text
Form di browser
   |
   v
public/index.js membaca input form
   |
   v
fetch POST ke /api/users atau /api/devices
   |
   v
route Express menerima req.body
   |
   v
Drizzle insert ke database
   |
   v
response JSON dikirim balik
   |
   v
hasil tampil di halaman
```

## 1. Mulai Dari Database

Project ini memakai Supabase yang sebenarnya menggunakan PostgreSQL.

Koneksi database disimpan di file `.env`:

```env
DATABASE_URL="your_database_url_here"
```

File yang memakai koneksi ini adalah:

```text
src/db/index.js
```

Isi sederhananya:
- membaca `DATABASE_URL`
- membuat koneksi ke PostgreSQL
- membuat object `db` dari Drizzle

Artinya, setiap file route bisa memakai `db` untuk membaca dan menulis data.

Visual koneksi database:

```text
.env
  |
  v
DATABASE_URL
  |
  v
src/db/index.js
  |
  v
db
```

## 2. Pahami Bentuk Tabel

Tabel database didefinisikan di:

```text
src/db/schema.js
```

Di file itu ada 2 tabel.

### Tabel `users`

- `id`
- `username`

### Tabel `devices`

- `id`
- `name`
- `status`
- `installed_at`
- `updated_at`

File ini penting karena menjadi acuan bentuk data project.

Visual tabel:

```text
users
|- id
|- username

devices
|- id
|- name
|- status
|- installed_at
|- updated_at
```

## 3. Buat Tabel Di Database

Setelah skema siap, kirim skema ke database:

```bash
npm run db:push
```

Tujuan perintah ini:
- membuat tabel `users`
- membuat tabel `devices`
- membuat enum `device_status_enum`

Kalau berhasil, sekarang database sudah siap dipakai.

## 4. Isi Data Awal

Project ini punya file seeder:

```text
src/seed.js
```

Jalankan:

```bash
npm run db:seed
```

Seeder akan menambahkan:
- 5 user
- 5 device

Tujuannya supaya saat project dibuka, sudah ada data yang bisa langsung dilihat.

## 5. Jalankan Server

Jalankan:

```bash
npm run dev
```

Entry point project ada di:

```text
index.js
```

File ini melakukan beberapa hal:
- membuat aplikasi Express
- mengaktifkan `express.json()` agar body JSON bisa dibaca
- mengaktifkan `express.static("public")` agar file HTML, CSS, dan JS bisa dibuka di browser
- mendaftarkan endpoint API

Endpoint yang aktif:
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `GET /api/devices`
- `GET /api/devices/:id`
- `POST /api/devices`

Visual tugas `index.js`:

```text
index.js
|- buat app Express
|- aktifkan express.json()
|- aktifkan express.static("public")
|- daftarkan route API
|- listen ke port 3000
```

## 6. Cara Data Ditampilkan Di Browser

Halaman browser ada di:

```text
public/index.html
```

JavaScript browser ada di:

```text
public/index.js
```

Ketika membuka:

```text
http://localhost:3000
```

browser akan memuat halaman dari folder `public`.

Catatan penting:

- jangan buka `public/index.html` dengan double click langsung
- file `index.html` dijalankan lewat server Express
- jadi server harus aktif lebih dulu dengan `npm run dev`

Lalu file `public/index.js` akan:
- mengambil data users dari `/api/users`
- mengambil data devices dari `/api/devices`
- menampilkan hasilnya ke halaman

Fungsi yang dipakai untuk ambil data:
- `loadUsers()`
- `loadDevices()`
- `refreshAll()`

Saat halaman dibuka, `refreshAll()` dipanggil, jadi data langsung ditampilkan otomatis.

Visual tampil data:

```text
Buka http://localhost:3000
   |
   v
Browser memuat public/index.html
   |
   v
public/index.js jalan
   |
   v
refreshAll()
   |
   +--> loadUsers() ---> GET /api/users ---> data user tampil
   |
   +--> loadDevices() -> GET /api/devices -> data device tampil
```

## 7. Cara API Mengambil Data Dari Database

Contoh endpoint ambil semua user ada di:

```text
src/routes/users.js
```

Logika sederhananya:

1. route menerima request `GET /api/users`
2. Drizzle menjalankan query ke tabel `users`
3. hasil query dikirim dalam bentuk JSON

Contoh alur:

```text
Browser -> GET /api/users -> db.select().from(userTable) -> JSON response
```

Visual langkah detail:

```text
1. Browser kirim request GET
2. Express memilih route yang sesuai
3. Route memanggil Drizzle
4. Drizzle baca tabel di database
5. Hasil dikirim sebagai JSON
6. Browser menampilkan hasil
```

Untuk device, alurnya sama tetapi membaca dari `deviceTable`.

## 8. Cara Mengirim Data Baru

Ada dua cara untuk kirim data:

1. lewat Insomnia atau Postman
2. lewat form di halaman browser

### Kirim user baru lewat API

Endpoint:

```text
POST /api/users
```

Body JSON:

```json
{
  "username": "budi"
}
```

Alur di server:

1. Express membaca `req.body`
2. route mengecek apakah `username` ada
3. jika ada, data disimpan ke tabel `users`
4. hasil insert dikirim kembali sebagai JSON

Visual:

```text
POST /api/users
   |
   v
req.body = { username: "budi" }
   |
   v
validasi username
   |
   v
insert ke tabel users
   |
   v
response JSON sukses
```

### Kirim device baru lewat API

Endpoint:

```text
POST /api/devices
```

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

Visual:

```text
POST /api/devices
   |
   v
req.body = { name, status, installed_at }
   |
   v
cek name wajib ada
   |
   v
insert ke tabel devices
   |
   v
response JSON sukses
```

## 9. Cara Form Di Browser Mengirim Data

Di halaman utama ada form:
- tambah user
- tambah device

Saat tombol submit ditekan, file `public/index.js` akan:

1. membaca isi form
2. membuat object JavaScript
3. mengubahnya menjadi JSON
4. mengirim `fetch(..., { method: "POST" })`
5. menampilkan hasil response
6. memuat ulang daftar data

Contoh alur untuk tambah user:

```text
Isi form -> klik Simpan User -> fetch POST /api/users -> server simpan ke DB -> hasil tampil di halaman
```

Visual form browser:

```text
Input form
  |
  v
FormData
  |
  v
payload JavaScript
  |
  v
JSON.stringify(payload)
  |
  v
fetch POST
  |
  v
hasil tampil di kotak response
```

## 10. Urutan Belajar File Yang Disarankan

Kalau masih bingung, baca file project dengan urutan ini:

1. `index.js`
   Untuk melihat bagaimana server dimulai.
2. `src/db/schema.js`
   Untuk memahami bentuk tabel.
3. `src/db/index.js`
   Untuk memahami koneksi database.
4. `src/routes/users.js`
   Untuk memahami API user.
5. `src/routes/devices.js`
   Untuk memahami API device.
6. `public/index.html`
   Untuk memahami tampilan halaman.
7. `public/index.js`
   Untuk memahami bagaimana browser mengambil dan mengirim data.

## 11. Langkah Praktik Yang Paling Mudah

Ikuti urutan ini:

1. jalankan `npm install`
2. buat file `.env`
3. isi `DATABASE_URL`
4. jalankan `npm run db:push`
5. jalankan `npm run db:seed`
6. jalankan `npm run dev`
7. buka `http://localhost:3000`
8. klik `Load Users` dan `Load Devices`
9. coba form `Tambah User`
10. coba form `Tambah Device`
11. coba cari data berdasarkan id

Dengan urutan ini, pemula bisa melihat seluruh alur project secara nyata.

Checklist praktik:

```text
[ ] npm install
[ ] buat .env
[ ] isi DATABASE_URL
[ ] npm run db:push
[ ] npm run db:seed
[ ] npm run dev
[ ] buka browser
[ ] lihat data users
[ ] lihat data devices
[ ] tambah user
[ ] tambah device
[ ] cari data by id
```

## 12. Hasil Akhir Yang Perlu Dipahami

Kalau sudah paham project ini, berarti kamu sudah belajar:

- cara koneksi Node.js ke Supabase Postgres
- cara membuat skema dengan Drizzle
- cara membuat endpoint `GET` dan `POST`
- cara menampilkan data di browser
- cara mengirim data dari form ke server
- cara membaca response JSON

## 13. Langkah Lanjut Setelah Paham Dasar

Setelah ini, biasanya fitur berikut yang bisa dipelajari:

1. tambah endpoint `PUT` atau `PATCH`
2. tambah endpoint `DELETE`
3. validasi input yang lebih ketat
4. pisahkan controller dan route
5. tambah autentikasi
6. deploy ke server online
