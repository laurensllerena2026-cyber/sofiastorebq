// Servidor de Sofía Store: recibe pedidos de la página y habla con MongoDB
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Product, Message, User } = require("./models");

const app = express();
app.use(cors());
app.use(express.json({ limit: "100kb" }));

// Revisa que el token del admin sea válido
function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "No autorizado" });
  }
}

app.get("/", (req, res) => res.json({ ok: true, tienda: "Sofía Store API" }));

// ---------- Productos ----------
app.get("/api/products", async (req, res) => {
  res.json(await Product.find().sort({ _id: 1 }));
});
app.post("/api/products", auth, async (req, res) => {
  try { res.status(201).json(await Product.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
app.put("/api/products/:id", auth, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    p ? res.json(p) : res.status(404).json({ error: "No existe" });
  } catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete("/api/products/:id", auth, async (req, res) => {
  try { await Product.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

// ---------- Mensajes de contacto ----------
app.post("/api/messages", async (req, res) => {
  try {
    const { name, contact, msg } = req.body;
    await Message.create({ name, contact, msg });
    res.status(201).json({ ok: true });
  } catch (e) { res.status(400).json({ error: "Revisa los datos del mensaje" }); }
});
app.get("/api/messages", auth, async (req, res) => {
  res.json(await Message.find().sort({ date: -1 }));
});

// ---------- Login del admin ----------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(String(password || ""), user.passwordHash))) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

// ---------- Arranque ----------
async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB conectado");
  const u = process.env.ADMIN_USER, p = process.env.ADMIN_PASS;
  if (u && p && !(await User.findOne({ username: u }))) {
    await User.create({ username: u, passwordHash: await bcrypt.hash(p, 10) });
    console.log("Usuario admin creado:", u);
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor listo en http://localhost:${port}`));
}
start().catch(e => { console.error("Error al iniciar:", e.message); process.exit(1); });
