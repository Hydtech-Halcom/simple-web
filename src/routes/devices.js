import { db } from '../db/index.js';
import { deviceTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export async function getDevices(req, res) {
  try {
    // Ambil semua data device dari tabel devices.
    const devices = await db.select().from(deviceTable);

    // Kirim hasilnya ke client dalam format JSON.
    res.status(200).json({ success: true, data: devices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getDeviceById(req, res) {
  try {
    // Ambil id dari parameter URL.
    const { id } = req.params;

    // Cari device yang id-nya sama dengan parameter.
    const device = await db.select().from(deviceTable).where(eq(deviceTable.id, id));

    // Jika tidak ada data, kirim response 404.
    if (device.length === 0) {
      res.status(404).json({ success: false, error: 'Device not found' });
      return;
    }

    // Jika ada, kirim 1 data device.
    res.status(200).json({ success: true, data: device[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createDevice(req, res) {
  try {
    // Express membaca body JSON dari request.
    const { name, status, installed_at } = req.body;

    // Validasi sederhana: name wajib diisi.
    if (!name) {
      res.status(400).json({ success: false, error: 'Name is required' });
      return;
    }

    // Simpan device baru ke database.
    const [newDevice] = await db
      .insert(deviceTable)
      .values({
        name,
        status: status || 'online',
        installed_at: installed_at || new Date(),
        updated_at: new Date(),
      })
      .returning();

    // Kirim data device yang baru dibuat.
    res.status(201).json({ success: true, data: newDevice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
