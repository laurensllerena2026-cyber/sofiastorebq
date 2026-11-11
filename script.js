// Prueba varias extensiones de foto (.jpg, .jpeg, .png...) antes de rendirse
const EXTS=[".jpg",".jpeg",".png",".webp",".JPG",".JPEG",".PNG"];
function nx(img){const i=+img.dataset.n;if(i<EXTS.length){img.dataset.n=i+1;img.src=img.dataset.base+EXTS[i]}else img.remove()}
// Textos del banner (vienen de data.js)
const $t=(id,t)=>{const el=document.getElementById(id);if(el&&t)el.textContent=t};
$t("barText",SITE.barra);$t("heroTop",SITE.heroArriba);$t("heroTitle",SITE.heroTitulo);$t("heroTag",SITE.heroFrase);$t("heroBtn",SITE.heroBoton);
const grid=document.getElementById("grid"),cats=document.getElementById("cats");
let current="Todos",favs=new Set(),cart=[];
try{cart=JSON.parse(localStorage.getItem("ss_cart"))||[]}catch(e){}
try{favs=new Set(JSON.parse(localStorage.getItem("ss_favs"))||[])}catch(e){}
const CATS=[["Todos","🏷️"],["Ropa","👗"],["Zapatos","👠"],["Bolsos","👜"]];
function card(p){
  return `<article class="card"><div class="ph" data-i="${esc(p.name[0])}"><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" data-base="${esc(p.img.replace(/(\.[a-z0-9]+)+$/i,""))}" data-n="0" onerror="nx(this)">
  <button class="fav ${favs.has(p.id)?"on":""}" data-f="${p.id}" aria-label="Me gusta">${favs.has(p.id)?"♥":"♡"}</button></div>
  <div class="info"><h3>${esc(p.name)}</h3><strong>${money(p.price)}</strong>
  <button class="btn small" data-add="${p.id}">Añadir al carrito</button></div></article>`;
}
function renderCats(){cats.innerHTML=CATS.map(([c,i])=>`<button class="cat ${c===current?"on":""}" data-c="${c}"><span>${i}</span>${c}</button>`).join("")}
function renderCatalog(){grid.innerHTML=getProducts().filter(p=>current==="Todos"||p.cat===current).map(card).join("")||"<p>Pronto tendremos prendas en esta categoría.</p>";renderCats()}
renderCatalog();
// Favoritos (se guardan en el navegador de cada persona)
const favGrid=document.getElementById("favGrid");
function renderFavs(){
  const l=getProducts().filter(p=>favs.has(p.id));
  favGrid.innerHTML=l.length?l.map(card).join(""):`<p class="empty">Aún no tienes favoritos. Toca el ♡ de cualquier producto y quedará guardado aquí.</p>`;
  document.getElementById("favCount").textContent=l.length;
}
renderFavs();
document.addEventListener("click",e=>{
  const c=e.target.closest("[data-c]"),a=e.target.closest("[data-add]"),f=e.target.closest("[data-f]");
  if(c){current=c.dataset.c;renderCatalog();document.getElementById("catalogo").scrollIntoView()}
  if(a){const p=getProducts().find(x=>x.id==a.dataset.add);if(p){cart.push(p);saveCart();a.textContent="¡Añadido!";setTimeout(()=>a.textContent="Añadir al carrito",1200)}}
  if(f){const id=+f.dataset.f;favs.has(id)?favs.delete(id):favs.add(id);document.querySelectorAll(`[data-f="${id}"]`).forEach(b=>{b.classList.toggle("on",favs.has(id));b.textContent=favs.has(id)?"♥":"♡"});try{localStorage.setItem("ss_favs",JSON.stringify([...favs]))}catch(err){}renderFavs()}
});

// Carrito
const dlg=document.getElementById("cartDlg");
function saveCart(){try{localStorage.setItem("ss_cart",JSON.stringify(cart))}catch(e){}drawCart()}
function drawCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const t=cart.reduce((s,p)=>s+p.price,0);
  document.getElementById("cartList").innerHTML=cart.length?cart.map((p,i)=>`<div class="note"><span>${esc(p.name)} · ${money(p.price)}</span><button class="btn small ghost" data-rm="${i}">Quitar</button></div>`).join(""):"<p>Tu carrito está vacío. Añade prendas del catálogo.</p>";
  document.getElementById("cartTotal").textContent=cart.length?"Total: "+money(t):"";
  const txt="Hola Sofía Store ✨\nQuiero hacer este pedido 🛍️:\n\n"+cart.map(p=>"💗 "+p.name+" - "+money(p.price)).join("\n")+"\n\nTotal: "+money(t)+" 💳\n¿Me confirman disponibilidad y envío? 🚚 ¡Gracias! 🙏";
  const w=document.getElementById("cartWa");w.href=`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(txt)}`;w.hidden=!cart.length;
}
document.getElementById("cartBtn").onclick=()=>{drawCart();dlg.showModal()};
document.getElementById("cartClose").onclick=()=>dlg.close();
document.getElementById("cartList").onclick=e=>{const r=e.target.dataset.rm;if(r!==undefined){cart.splice(+r,1);saveCart()}};
drawCart();

// Asesor de estilo
document.getElementById("styleForm").addEventListener("submit",e=>{
  e.preventDefault();
  const TIPOS={prenda:"Ropa",bolso:"Bolsos",zapato:"Zapatos"};
  const occ=document.getElementById("occ").value,cat=TIPOS[document.getElementById("tipo").value];
  const r=getProducts().filter(p=>p.tags.includes(occ)&&p.cat===cat);
  document.getElementById("recs").innerHTML=r.length?r.map(card).join(""):`<p class="empty">Todavía no tenemos esa combinación en el catálogo. Prueba otra ocasión o escríbenos y te ayudamos.</p>`;
});

// Contacto
function guardar(m){const l=getMsgs();l.unshift(m);saveMsgs(l);if(FORM_URL)return fetch(FORM_URL,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(m)})}
const form=document.getElementById("contactForm"),st=document.getElementById("cStatus");
form.addEventListener("submit",async e=>{
  e.preventDefault();
  const m={name:cName.value.trim(),contact:cContact.value.trim(),msg:cMsg.value.trim(),date:new Date().toLocaleString("es-CO")};
  if(m.name.length<2||!m.contact||m.msg.length<5){st.textContent="Completa nombre, contacto y un mensaje de al menos 5 letras.";return}
  try{await guardar(m)}catch(err){st.textContent="Guardado, pero no se pudo enviar por correo. Escríbenos por WhatsApp.";return}
  st.textContent="¡Mensaje enviado! Te respondemos pronto.";form.reset();
});
document.getElementById("wa").href=`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent("Hola Sofía Store, quiero información")}`;

// Menú móvil
const burger=document.querySelector(".burger"),nav=document.getElementById("nav");
burger.addEventListener("click",()=>{const o=nav.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
nav.addEventListener("click",()=>nav.classList.remove("open"));
document.getElementById("yr").textContent=new Date().getFullYear();