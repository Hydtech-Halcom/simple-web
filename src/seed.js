import "dotenv/config";
import { db } from "./db/index.js";
import { deviceTable, userTable } from "./db/schema.js";

const users = [
  { username: "johndoe" },
  { username: "janedoe" },
  { username: "bobsmith" },
  { username: "alicejones" },
  { username: "charliebrown" },
];

const devices = [
  { name: "Sensor Suhu Ruang A", status: "online" },
  { name: "Sensor Kelembaban Ruang B", status: "online" },
  { name: "Kamera CCTV Lobby", status: "offline" },
  { name: "Smart Lock Pintu Utama", status: "online" },
  { name: "Motion Detector Garasi", status: "deleted" },
];

async function seed() {
  try {
    console.log("Seeding users...");
    await db.insert(userTable).values(users);
    console.log("5 users inserted");

    console.log("Seeding devices...");
    await db.insert(deviceTable).values(devices);
    console.log("5 devices inserted");

    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
