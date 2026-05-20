import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function getUsers(req, res) {
  try {
    // Ambil semua data user dari tabel users.
    const users = await db.select().from(userTable);

    // Kirim hasilnya ke client dalam format JSON.
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    // Ambil id dari parameter URL.
    const { id } = req.params;

    // Cari user yang id-nya sama dengan parameter.
    const user = await db.select().from(userTable).where(eq(userTable.id, id));

    // Jika tidak ada data, kirim response 404.
    if (user.length === 0) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    // Jika ada, kirim 1 data user.
    res.status(200).json({ success: true, data: user[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createUser(req, res) {
  try {
    // Express membaca body JSON dari request.
    const { username } = req.body;

    // Validasi sederhana: username wajib diisi.
    if (!username) {
      res.status(400).json({ success: false, error: "Username is required" });
      return;
    }

    // Simpan user baru ke database.
    const [newUser] = await db.insert(userTable).values({ username }).returning();

    // Kirim data user yang baru dibuat.
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
