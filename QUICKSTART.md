# Quick Start

Kalau ingin langsung jalan tanpa baca detail panjang, ikuti langkah ini.

## 1. Install package

```bash
npm install
```

## 2. Buat file `.env`

Isi:

```env
DATABASE_URL="your_database_url_here"
```

## 3. Buat tabel di database

```bash
npm run db:push
```

## 4. Isi data awal

```bash
npm run db:seed
```

## 5. Jalankan server

```bash
npm run dev
```

## 6. Buka halaman web atau endpoint API

Buka:

```text
http://localhost:3000
http://localhost:3000/api/users
http://localhost:3000/api/devices
```

Keterangan:

- `http://localhost:3000` menampilkan halaman web sederhana
- `/api/users` menampilkan data users dalam format JSON
- `/api/devices` menampilkan data devices dalam format JSON

Catatan penting:

- jangan buka `public/index.html` dengan double click langsung
- jalankan dulu server dengan `npm run dev`
- setelah itu baru buka `http://localhost:3000` di browser

## 7. Coba request `POST`

Tambah user:

```bash
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"username":"andi"}'
```

Tambah device:

```bash
curl -X POST http://localhost:3000/api/devices -H "Content-Type: application/json" -d '{"name":"Sensor Kantor","status":"online"}'
```

## Endpoint Singkat

| Method | Endpoint |
| --- | --- |
| `GET` | `/api/users` |
| `GET` | `/api/users/:id` |
| `POST` | `/api/users` |
| `GET` | `/api/devices` |
| `GET` | `/api/devices/:id` |
| `POST` | `/api/devices` |

## Kalau Bingung Mulai Dari Mana

Urutan belajar yang disarankan:

1. Buka `index.js`
2. Lihat `src/routes/users.js`
3. Lihat `src/routes/devices.js`
4. Lihat `src/db/schema.js`
5. Buka `public/index.js`
6. Jalankan request ke endpoint
