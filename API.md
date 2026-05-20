# API Documentation

Navigasi:

- [`README.md`](./README.md)
- [`SETUP.md`](./SETUP.md)
- [`QUICKSTART.md`](./QUICKSTART.md)
- [`BELAJAR-PROJECT.md`](./BELAJAR-PROJECT.md)

Dokumentasi ini berisi detail endpoint API yang tersedia pada project ini.

Base URL lokal:

```text
http://localhost:3000
```

## Alur Singkat API

Semua endpoint di project ini mengikuti alur dasar yang sama:

```text
Client
  |
  v
Request ke endpoint API
  |
  v
Express Server (index.js)
  |
  v
Route Handler (src/routes)
  |
  v
Drizzle ORM
  |
  v
Supabase Postgres
  |
  v
Response JSON
```

Client bisa berupa:
- browser dari halaman `public/`
- Insomnia
- Postman
- `curl`

## Format Response

Sebagian besar endpoint mengembalikan format seperti ini.

Response sukses:

```json
{
  "success": true,
  "data": {}
}
```

Response gagal:

```json
{
  "success": false,
  "error": "Pesan error"
}
```

## 1. Get All Users

- Method: `GET`
- URL: `/api/users`
- Full URL: `http://localhost:3000/api/users`

Fungsi:
- mengambil semua data user dari tabel `users`

Alur endpoint:

```text
Client
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

Contoh response sukses:

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "username": "janedoe"
    }
  ]
}
```

## 2. Get User By ID

- Method: `GET`
- URL: `/api/users/:id`
- Full URL contoh: `http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000`

Fungsi:
- mengambil 1 user berdasarkan `id`

Alur endpoint:

```text
Client
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

Contoh response sukses:

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe"
  }
}
```

Contoh response jika id tidak ditemukan:

```json
{
  "success": false,
  "error": "User not found"
}
```

## 3. Create User

- Method: `POST`
- URL: `/api/users`
- Full URL: `http://localhost:3000/api/users`
- Header: `Content-Type: application/json`

Fungsi:
- menambahkan user baru ke tabel `users`

Alur endpoint:

```text
Client
  |
  v
POST /api/users
Body JSON
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

Body JSON:

```json
{
  "username": "budi"
}
```

Penjelasan field:

| Field | Tipe | Wajib | Keterangan |
| --- | --- | --- | --- |
| `username` | `string` | ya | nama user |

Contoh response sukses:

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "username": "budi"
  }
}
```

Contoh response error:

```json
{
  "success": false,
  "error": "Username is required"
}
```

## 4. Get All Devices

- Method: `GET`
- URL: `/api/devices`
- Full URL: `http://localhost:3000/api/devices`

Fungsi:
- mengambil semua data device dari tabel `devices`

Alur endpoint:

```text
Client
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

Contoh response sukses:

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "name": "Sensor Suhu Ruang A",
      "status": "online",
      "installed_at": "2026-05-20T10:00:00.000Z",
      "updated_at": "2026-05-20T10:00:00.000Z"
    }
  ]
}
```

## 5. Get Device By ID

- Method: `GET`
- URL: `/api/devices/:id`
- Full URL contoh: `http://localhost:3000/api/devices/550e8400-e29b-41d4-a716-446655440100`

Fungsi:
- mengambil 1 device berdasarkan `id`

Alur endpoint:

```text
Client
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

Contoh response sukses:

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440100",
    "name": "Sensor Suhu Ruang A",
    "status": "online",
    "installed_at": "2026-05-20T10:00:00.000Z",
    "updated_at": "2026-05-20T10:00:00.000Z"
  }
}
```

Contoh response jika id tidak ditemukan:

```json
{
  "success": false,
  "error": "Device not found"
}
```

## 6. Create Device

- Method: `POST`
- URL: `/api/devices`
- Full URL: `http://localhost:3000/api/devices`
- Header: `Content-Type: application/json`

Fungsi:
- menambahkan device baru ke tabel `devices`

Alur endpoint:

```text
Client
  |
  v
POST /api/devices
Body JSON
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

Penjelasan field:

| Field | Tipe | Wajib | Keterangan |
| --- | --- | --- | --- |
| `name` | `string` | ya | nama device |
| `status` | `string` | tidak | nilai yang diperbolehkan: `online`, `offline`, `deleted` |
| `installed_at` | `string` datetime ISO | tidak | tanggal instalasi |

Catatan:
- jika `status` tidak dikirim, default menjadi `online`
- jika `installed_at` tidak dikirim, server akan mengisi waktu saat data dibuat
- `updated_at` akan diisi otomatis oleh server

Contoh response sukses:

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440110",
    "name": "Sensor Kantor",
    "status": "online",
    "installed_at": "2026-05-20T10:00:00.000Z",
    "updated_at": "2026-05-20T10:00:00.000Z"
  }
}
```

Contoh response error:

```json
{
  "success": false,
  "error": "Name is required"
}
```

## Testing Dengan Insomnia

Download Insomnia:

```text
https://insomnia.rest/download
```

Langkah singkat:

1. Jalankan server dengan `npm run dev`
2. Buka Insomnia
3. Buat request baru
4. Pilih method `GET` atau `POST`
5. Masukkan URL endpoint
6. Jika `POST`, buka tab body lalu pilih `JSON`
7. Masukkan body sesuai contoh di atas
8. Klik `Send`

## Alur Dari Halaman Browser

Selain dari Insomnia, endpoint API juga dipakai langsung oleh halaman web di project ini.

Alurnya:

```text
Browser buka /
  |
  v
public/index.html dimuat
  |
  v
public/index.js berjalan
  |
  +--> GET /api/users
  |
  +--> GET /api/devices
  |
  v
Data tampil di halaman
```

Saat form dipakai:

```text
User isi form di browser
  |
  v
public/index.js membaca input
  |
  v
fetch POST ke /api/users atau /api/devices
  |
  v
Server menyimpan data ke database
  |
  v
Response JSON tampil di halaman
```
