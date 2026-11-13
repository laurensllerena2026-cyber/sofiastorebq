// Chatbot de Sofía Store: recibe la pregunta, le pide la respuesta a la IA de Google (Gemini)
// y la devuelve a la página. La clave de la IA vive SOLO aquí, en el servidor (.env).
const express = require("express");
const { Product } = require("./models");
const router = express.Router();

// Modelos a probar en orden (los nombres de Google cambian seguido; si uno falla, prueba el siguiente)
const MODELOS = [process.env.GEMINI_MODEL, "gemini-4-hydrogen", "gemini-3.8-flash"].filter(Boolean);

async function preguntarAGemini(modelo, cuerpo, conPensamiento) {
  const gen = { maxOutputTokens: 2048, temperature: 0.7 };
  if (conPensamiento) gen.thinkingConfig = { thinkingLevel: "low" }; // respuestas rápidas
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
    body: JSON.stringify({ ...cuerpo, generationConfig: gen })
  });
  const data = await r.json().catch(() => ({}));
  const texto = (data?.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("").trim();
  return { ok: r.ok && !!texto, status: r.status, texto, error: data?.error?.message };
}

// Límite simple: máximo 8 mensajes por minuto por persona (para que nadie gaste la clave)
const registro = new Map();
function permitido(ip) {
  const ahora = Date.now();
  const recientes = (registro.get(ip) || []).filter(t => ahora - t < 60000);
  if (recientes.length >= 8) return false;
  recientes.push(ahora);
  registro.set(ip, recientes);
  return true;
}

// Respuestas de respaldo: se usan si la IA no responde (así el chat nunca se queda mudo)
function respuestaBasica(texto) {
  const t = texto.toLowerCase();
  if (/hola|buenas|buenos|hey/.test(t)) return "¡Hola! Soy el asistente de Sofía Store 💗 Pregúntame por prendas, zapatos, bolsos, envíos o pagos.";
  if (/env[ií]o|enviar|entrega|despacho/.test(t)) return "Hacemos envíos a toda Colombia. Para coordinar el tuyo, escríbenos por WhatsApp desde el carrito o el formulario de contacto.";
  if (/pago|pagar|contra entrega|tarjeta|nequi|transferencia/.test(t)) return "Puedes pagar contra entrega. Si necesitas otro medio de pago, escríbenos por WhatsApp y te ayudamos.";
  if (/precio|cu[aá]nto|vale|costo/.test(t)) return "Los precios están en cada producto del catálogo. Si buscas algo con un presupuesto, cuéntame cuánto quieres gastar.";
  if (/talla|medida|stock|disponible/.test(t)) return "Para tallas y disponibilidad, escríbenos por WhatsApp y te confirmamos al momento.";
  if (/zapato|tenis|sandalia/.test(t)) return "Mira la categoría Zapatos del catálogo 👠 Y si me dices la ocasión, te ayudo a escoger.";
  if (/bolso|cartera|mochila/.test(t)) return "Mira la categoría Bolsos del catálogo 👜 ¿Lo quieres para el día a día o para una salida?";
  if (/ropa|vestido|blusa|pantal[oó]n|conjunto|outfit|look|fiesta|playa|casual|elegante/.test(t)) return "Usa el Asesor de estilo de la página: elige la ocasión y qué buscas, y te sugerimos prendas del catálogo ✨";
  return "Puedo ayudarte con prendas, zapatos, bolsos, envíos y pagos 💗 Y para pedidos, escríbenos por WhatsApp desde el carrito.";
}

router.post("/", async (req, res) => {
  const mensaje = String(req.body?.message || "").trim().slice(0, 500);
  if (!mensaje) return res.status(400).json({ error: "Escribe un mensaje" });

  const ip = String(req.headers["x-forwarded-for"] || req.ip || "").split(",")[0].trim();
  if (!permitido(ip)) {
    return res.status(429).json({ reply: "Estás escribiendo muy rápido. Espera un momento e inténtalo otra vez 💗" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("Falta GEMINI_API_KEY");

    const productos = await Product.find().limit(60);
    const catalogo = productos.map(p => `- ${p.name} (${p.cat}, $${p.price} COP)`).join("\n");
    const instrucciones =
      "Eres el asistente virtual de Sofía Store, una tienda de ropa, zapatos y bolsos de Barranquilla, Colombia (Instagram @sofiastore_bq). " +
      "Habla en español, con tono cálido y cercano, en máximo 3 frases cortas. Puedes usar un emoji. " +
      "Lo que sabes de la tienda: hace envíos a toda Colombia, se puede pagar contra entrega, la compra es segura y la atención es personalizada. " +
      "Para hacer un pedido, el cliente usa el carrito de la página y el botón de WhatsApp, o el formulario de contacto. " +
      "Recomienda SOLO productos de este catálogo:\n" + catalogo + "\n" +
      "No inventes precios, tallas, colores, stock, descuentos ni tiempos de entrega. Si te preguntan algo que no sabes, dilo con amabilidad y sugiere escribir por WhatsApp. " +
      "Si preguntan algo que no tiene que ver con la tienda, responde breve y vuelve a hablar de la tienda.";

    const historial = (Array.isArray(req.body?.history) ? req.body.history : [])
      .slice(-6)
      .map(m => ({
        role: m.role === "bot" ? "model" : "user",
        parts: [{ text: String(m.text || "").slice(0, 500) }]
      }));
    while (historial.length && historial[0].role !== "user") historial.shift(); // debe empezar con el usuario

    const cuerpo = {
      systemInstruction: { parts: [{ text: instrucciones }] },
      contents: [...historial, { role: "user", parts: [{ text: mensaje }] }]
    };
    let texto = "", ultimoError = "La IA no devolvió texto";
    buscar:
    for (const modelo of MODELOS) {
      for (const conPensamiento of [true, false]) {
        const resp = await preguntarAGemini(modelo, cuerpo, conPensamiento);
        if (resp.ok) { texto = resp.texto; break buscar; }
        ultimoError = `${modelo}: ${resp.error || resp.status}`;
        if (resp.status !== 400) break; // 400 = parámetro no aceptado: reintenta sin él; otro error: siguiente modelo
      }
    }
    if (!texto) throw new Error(ultimoError);
    res.json({ reply: texto, ia: true });
  } catch (e) {
    console.error("Chat (se usa respuesta de respaldo):", e.message);
    res.json({ reply: respuestaBasica(mensaje), ia: false });
  }
});

module.exports = router;
