// ====== CONFIGURA AQUÍ ======
const WHATSAPP = "573135816387";   // 
const FORM_URL = "";               // pega aquí tu enlace de Formspree (ver README)
const ADMIN_USER = "lauren";
const ADMIN_PASS = "laulau20";   //
// ============================
// ====== TEXTOS DE LA PÁGINA (cámbialos aquí) ======
const SITE = {
  barra: "✨ Envíos a todo el país | Paga contra entrega | Compra segura ✨",
  heroArriba: "Vístete de confianza",
  heroTitulo: "vístete de estilo",
  heroFrase: "DONDE LA TENDENCIA COBRA VIDA",
  heroBoton: "Comprar ahora →"
};
// ====== PRODUCTOS (nombre, precio, categoría, foto) ======
// cat debe ser exactamente: "Ropa", "Zapatos" o "Bolsos"
// tags (para el asesor de estilo): "fiesta", "casual", "playa", "elegante"
const DEFAULT_PRODUCTS = [
  {id:1,name:"Vestido Celeste Halter",price:110000,cat:"Ropa",tags:["elegante"],img:"img/prenda1.jpeg",desc:""},
  {id:2,name:"Blusa Lunares Chocolate",price:90000,cat:"Ropa",tags:["casual","elegante","fiesta"],img:"img/prenda2.jpeg",desc:""},
  {id:3,name:"Vestido Brisa Bordado",price:120000,cat:"Ropa",tags:["playa","casual"],img:"img/prenda3.jpeg",desc:""},
  {id:4,name:"Pantalón Rayas Burgundy",price:100000,cat:"Ropa",tags:["elegante","casual"],img:"img/prenda4.jpeg",desc:""},
  {id:5,name:"Conjunto Fresh Green",price:120000,cat:"Ropa",tags:["elegante","casual"],img:"img/prenda5.jpeg",desc:""},
  {id:6,name:"Conjunto Siena",price:120000,cat:"Ropa",tags:["elegante"],img:"img/prenda6.jpeg",desc:""},
  {id:7,name:"Mules Trenzadas Elegance",price:85000,cat:"Zapatos",tags:["casual","elegante"],img:"img/zapatos1.jpeg",desc:""},
  {id:8,name:"Tenis Urban Sport",price:90000,cat:"Zapatos",tags:["casual"],img:"img/zapatos2.jpeg",desc:""},
  {id:9,name:"Sandalias Comfort Chic",price:75000,cat:"Zapatos",tags:["casual"],img:"img/zapatos3.jpeg",desc:""},
  {id:10,name:"Oxford Dorado Glam",price:95000,cat:"Zapatos",tags:["casual"],img:"img/zapatos4.jpeg",desc:""},
  {id:11,name:"Sandalias Ibiza",price:70000,cat:"Zapatos",tags:["casual","playa"],img:"img/zapatos5.jpeg",desc:""},
  {id:12,name:"Mini Bolso Coach Cherry",price:120000,cat:"Bolsos",tags:["elegante","casual"],img:"img/bolso1.jpeg",desc:""},
  {id:13,name:"Bolso Mini Éclat Ivory",price:100000,cat:"Bolsos",tags:["elegante"],img:"img/bolso2.jpeg",desc:""}
 ,{id:14,name:"Mochila Urban",price:130000,cat:"Bolsos",tags:["casual"],img:"img/bolso3.jpeg",desc:""}
];
function getProducts(){try{const s=JSON.parse(localStorage.getItem("ss_products"));if(Array.isArray(s)&&s.length)return s}catch(e){}return DEFAULT_PRODUCTS}
function saveProducts(p){try{localStorage.setItem("ss_products",JSON.stringify(p))}catch(e){}}
function saveMsgs(m){try{localStorage.setItem("ss_msgs",JSON.stringify(m))}catch(e){}}
const money=n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
