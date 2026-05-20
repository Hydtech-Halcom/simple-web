import "dotenv/config";
import express from "express";
import { getUsers, getUserById, createUser } from "./src/routes/users.js";
import {
  getDevices,
  getDeviceById,
  createDevice,
} from "./src/routes/devices.js";

// Buat aplikasi Express.
const app = express();

// Gunakan PORT dari file .env jika ada.
// Kalau tidak ada, pakai port 3000.
const PORT = process.env.PORT || 3000;

// Middleware ini membuat Express bisa membaca body JSON.
app.use(express.json());

// Folder public akan otomatis bisa dibuka dari browser.
// Contoh: http://localhost:3000 akan menampilkan public/index.html
app.use(express.static("public"));

// =========================
// ROUTE API USERS
// =========================
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users", createUser);

// =========================
// ROUTE API DEVICES
// =========================
app.get("/api/devices", getDevices);
app.get("/api/devices/:id", getDeviceById);
app.post("/api/devices", createDevice);

// Jalankan server Express.
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Halaman web: http://localhost:${PORT}`);
  console.log(`API users: http://localhost:${PORT}/api/users`);
  console.log(`API devices: http://localhost:${PORT}/api/devices`);
});
