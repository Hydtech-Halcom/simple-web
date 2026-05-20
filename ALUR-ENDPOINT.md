# Alur Endpoint

Navigasi:

- [`README.md`](./README.md)
- [`SETUP.md`](./SETUP.md)
- [`QUICKSTART.md`](./QUICKSTART.md)
- [`API.md`](./API.md)
- [`BELAJAR-PROJECT.md`](./BELAJAR-PROJECT.md)

Dokumen ini berisi alur request untuk setiap endpoint agar `README.md` tetap ringkas.

## Alur Dasar

Semua endpoint mengikuti pola besar yang sama:

```text
Client
  |
  v
index.js
  |
  v
src/routes/
  |
  v
src/db/index.js
  |
  v
Supabase Postgres
  |
  v
Response JSON
```

## Users

### GET `/api/users`

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

### GET `/api/users/:id`

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

### POST `/api/users`

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

## Devices

### GET `/api/devices`

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

### GET `/api/devices/:id`

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

### POST `/api/devices`

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

## Alur Dari Halaman Browser

Saat membuka `http://localhost:3000`:

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
