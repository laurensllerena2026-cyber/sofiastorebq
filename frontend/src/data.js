// Textos del banner
export const SITE = {
  barra: "✨ Envíos a todo el país | Paga contra entrega | Compra segura ✨",
  heroArriba: "Vístete de confianza",
  heroTitulo: "vístete de estilo",
  heroFrase: "DONDE LA TENDENCIA COBRA VIDA",
  heroBoton: "Comprar ahora →"
};

export const CATEGORIAS = [["Todos", "🏷️"], ["Ropa", "👗"], ["Zapatos", "👠"], ["Bolsos", "👜"]];

// Productos de respaldo: se muestran mientras llegan los del servidor
export const PRODUCTOS_RESPALDO = [
  {id:"1",name:"Vestido Celeste Halter",price:110000,cat:"Ropa",tags:["elegante"],img:"img/prenda1.jpeg"},
  {id:"2",name:"Blusa Lunares Chocolate",price:90000,cat:"Ropa",tags:["casual","elegante","fiesta"],img:"img/prenda2.jpeg"},
  {id:"3",name:"Vestido Brisa Bordado",price:120000,cat:"Ropa",tags:["playa","casual"],img:"img/prenda3.jpeg"},
  {id:"4",name:"Pantalón Rayas Burgundy",price:100000,cat:"Ropa",tags:["elegante","casual"],img:"img/prenda4.jpeg"},
  {id:"5",name:"Conjunto Fresh Green",price:120000,cat:"Ropa",tags:["elegante","casual"],img:"img/prenda5.jpeg"},
  {id:"6",name:"Conjunto Siena",price:120000,cat:"Ropa",tags:["elegante"],img:"img/prenda6.jpeg"},
  {id:"7",name:"Mules Trenzadas Elegance",price:85000,cat:"Zapatos",tags:["casual","elegante"],img:"img/zapatos1.jpeg"},
  {id:"8",name:"Tenis Urban Sport",price:90000,cat:"Zapatos",tags:["casual"],img:"img/zapatos2.jpeg"},
  {id:"9",name:"Sandalias Comfort Chic",price:75000,cat:"Zapatos",tags:["casual"],img:"img/zapatos3.jpeg"},
  {id:"10",name:"Oxford Dorado Glam",price:95000,cat:"Zapatos",tags:["casual"],img:"img/zapatos4.jpeg"},
  {id:"11",name:"Sandalias Ibiza",price:70000,cat:"Zapatos",tags:["casual","playa"],img:"img/zapatos5.jpeg"},
  {id:"12",name:"Mini Bolso Coach Cherry",price:120000,cat:"Bolsos",tags:["elegante","casual"],img:"img/bolso1.jpeg"},
  {id:"13",name:"Bolso Mini Éclat Ivory",price:100000,cat:"Bolsos",tags:["elegante"],img:"img/bolso2.jpeg"},
  {id:"14",name:"Mochila Urban",price:130000,cat:"Bolsos",tags:["casual"],img:"img/bolso3.jpeg"}
];

// Convierte un número en pesos colombianos: 110000 -> $ 110.000
export const money = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);