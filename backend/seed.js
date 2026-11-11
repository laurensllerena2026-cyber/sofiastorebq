// Copia los productos de tu data.js a MongoDB (se puede repetir sin problema)
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { Product } = require("./models");

async function run() {
  const src = fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8");
  const lista = new Function(src + "\nreturn DEFAULT_PRODUCTS;")();
  const docs = lista.map(({ name, price, cat, tags, img, desc }) => ({ name, price, cat, tags, img, desc }));
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(docs);
  console.log(`Listo: ${docs.length} productos guardados en MongoDB`);
  await mongoose.disconnect();
}
run().catch(e => { console.error("Error:", e.message); process.exit(1); });
