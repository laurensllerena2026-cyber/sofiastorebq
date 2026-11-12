// Cambia (o crea) la contraseña del admin usando ADMIN_USER y ADMIN_PASS del archivo .env
// Uso: cambia ADMIN_PASS en el .env, guarda, y corre:  node setAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { User } = require("./models");

async function run() {
  const u = process.env.ADMIN_USER, p = process.env.ADMIN_PASS;
  if (!u || !p) throw new Error("Falta ADMIN_USER o ADMIN_PASS en el .env");
  await mongoose.connect(process.env.MONGO_URI);
  await User.findOneAndUpdate(
    { username: u },
    { passwordHash: await bcrypt.hash(p, 10) },
    { upsert: true, new: true }
  );
  console.log("Contraseña del admin actualizada para:", u);
  await mongoose.disconnect();
}
run().catch(e => { console.error("Error:", e.message); process.exit(1); });
