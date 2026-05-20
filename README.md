# Setup

1. Instal dependensi

```
npm install
```

2. Copy .env.example ke .env, dan ganti DATABASE_URL

```
DATABASE_URL="your_database_url_here"
```

3. Buat migrasi

```
npm run db:generate
```

4. Jalankan migrasi

```
npm run db:migrate
```

5. Push migrasi ke database

```
npm run db:push
```

6. Jalankan aplikasi

```
npm run dev
```
