(() => {
"use strict";
window.ASPEN_CHECKOUT_CONTROLLER=true;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const STORE=window.STORE||{currency:"USD",shippingThreshold:250};
const PRODUCTS=Array.isArray(window.PRODUCTS)?window.PRODUCTS:[];
const CART_KEYS=["aspen-labs-cart-v2","aspen-labs-cart-backup-v1","forma-cart-v2"];
const DATA_KEY="aspen-labs-checkout-data-v1";
const SHIP_KEY="aspen-checkout-shipping-method";
const ORDER_KEY="aspen-labs-payment-order-v1";
const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:STORE.currency||"USD"}).format(Number(n)||0);

function readJson(key,fallback){
  try{const v=JSON.parse(localStorage.getItem(key)||"");return v??fallback}catch(_){return fallback}
}
function readCart(){
  for(const key of CART_KEYS){
    const v=readJson(key,null);
    if(Array.isArray(v)&&v.length)return v;
  }
  return [];
}
function productFor(slug){return PRODUCTS.find(p=>p.slug===slug||(slug==="etatrutide"&&p.slug==="retatrutide"))}
function variantFor(p,label){
  const vs=Array.isArray(p?.variants)?p.variants:[];
  return vs.find(v=>v.label===label)||vs[0]||{label:"Default",price:p?.price??0};
}
function buildOrderLines(){
  const out=[];
  for(const line of readCart()){
    const p=productFor(line.slug);if(!p)continue;
    const v=variantFor(p,line.variant);
    const price=Number(v?.price??p.price);
    const qty=Math.max(1,Math.min(100,Number(line.qty)||1));
    if(!Number.isFinite(price)||price<0)continue;
    const variants=Array.isArray(p?.variants)?p.variants:[];
    const variantIndex=Math.max(0,variants.findIndex(x=>x.label===v?.label));
    const image=(Array.isArray(p?.gallery)&&p.gallery[variantIndex])?p.gallery[variantIndex]:p.image;
    out.push({slug:p.slug,name:p.name,variant:v?.label||"",qty,unitPrice:price,lineTotal:price*qty,image});
  }
  return out;
}
function subtotalOf(lines){return lines.reduce((n,x)=>n+x.lineTotal,0)}
function qualifiesFree(subtotal){return subtotal>=Number(STORE.shippingThreshold||250)}
function shippingCost(method,subtotal){
  if(method==="free"&&qualifiesFree(subtotal))return 0;
  if(method==="priority")return 14.99;
  return 4.99;
}
function availableMethod(method,subtotal){
  const qualifies=qualifiesFree(subtotal);
  return qualifies ? (method==="free"||method==="priority") : (method==="standard"||method==="priority");
}
function chosenMethod(subtotal){
  let method=localStorage.getItem(SHIP_KEY)||"";
  if(!availableMethod(method,subtotal))method="";
  if(!method)method=qualifiesFree(subtotal)?"free":"standard";
  return method;
}
function syncShipping(lines){
  const subtotal=subtotalOf(lines);
  const qualifies=qualifiesFree(subtotal);
  const standard=$('[data-ship-method="standard"]');
  const free=$('[data-ship-method="free"]');
  if(standard){
    standard.hidden=qualifies;
    const input=$('input[name="ship"]',standard);
    if(input)input.disabled=qualifies;
  }
  if(free){
    free.hidden=!qualifies;
    const input=$('input[name="ship"]',free);
    if(input)input.disabled=!qualifies;
  }
  let method=chosenMethod(subtotal);
  const input=$('input[name="ship"][value="'+method+'"]');
  if(input)input.checked=true;
  $('#shippingMethods .checkout-method').forEach(card=>{
    const radio=$('input[name="ship"]',card);
    card.classList.toggle("selected",Boolean(radio?.checked));
  });
  const crypto=$('input[name="payment"][value="crypto"]');
  if(crypto){
    crypto.checked=true;
    crypto.closest('.checkout-method')?.classList.add('selected');
  }
  localStorage.setItem(SHIP_KEY,method);
  return method;
}
function renderSummary(){
  const root=$("#checkout-summary");if(!root)return;
  const lines=buildOrderLines();
  if(!lines.length){
    root.innerHTML='<div class="summary-line"><span>Your cart is empty</span><strong>—</strong></div>';
    return;
  }
  const subtotal=subtotalOf(lines);
  const method=syncShipping(lines);
  const shipping=shippingCost(method,subtotal);
  const total=subtotal+shipping;
  root.innerHTML=
    lines.map(x=>'<div class="checkout-order-item">'+
      '<div class="checkout-order-thumb"><img src="'+escapeHtml(x.image||"")+'" alt=""></div>'+
      '<div class="checkout-order-copy"><strong>'+escapeHtml(x.name)+'</strong>'+
        (x.variant?'<small>'+escapeHtml(x.variant)+'</small>':'')+
        '<small>Qty '+x.qty+' · '+money(x.unitPrice)+' each</small>'+
      '</div>'+
      '<strong class="checkout-order-line-total">'+money(x.lineTotal)+'</strong>'+
    '</div>').join("")+
    '<div class="summary-line"><span>Subtotal</span><strong>'+money(subtotal)+'</strong></div>'+
    '<div class="summary-line"><span>Shipping</span><strong>'+(shipping===0?'Free':money(shipping))+'</strong></div>'+
    '<div class="summary-line total"><strong>Estimated total</strong><strong>'+money(total)+'</strong></div>';
}
function escapeHtml(v){
  return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
}
function readData(){return readJson(DATA_KEY,{})||{}}
function saveData(form){
  const data={...readData()};
  $$("input,select,textarea",form).forEach(el=>{
    const key=el.name||el.id;if(!key)return;
    if(el.type==="radio"){if(el.checked)data[key]=el.value}
    else if(el.type==="checkbox")data[key]=Boolean(el.checked);
    else data[key]=el.value;
  });
  localStorage.setItem(DATA_KEY,JSON.stringify(data));
}
function restoreData(form){
  const data=readData();
  $$("input,select,textarea",form).forEach(el=>{
    const key=el.name||el.id;if(!key||!(key in data))return;
    if(el.type==="radio")el.checked=String(data[key])===String(el.value);
    else if(el.type==="checkbox")el.checked=Boolean(data[key]);
    else el.value=data[key]??"";
  });
}
function populateCountries(){
  const select=$("#country");if(!select||select.options.length>1)return;
  const codes="US CA MX GB IE FR DE ES PT IT NL BE LU CH AT DK SE NO FI IS PL CZ SK HU RO BG GR HR SI RS BA ME MK AL EE LV LT UA MD BY RU TR CY MT AD MC SM VA LI AU NZ JP KR CN HK MO TW SG MY TH VN PH ID BN KH LA MM IN PK BD LK NP BT MV AF KZ UZ TM KG TJ MN AE SA QA KW BH OM IL JO LB SY IQ IR YE GE AM AZ ZA EG MA DZ TN LY SD SS ET ER DJ SO KE UG TZ RW BI CD CG GA GQ CM CF TD NG NE ML BF SN GM GW GN SL LR CI GH TG BJ MR CV ST AO ZM ZW BW NA SZ LS MZ MW MG MU SC KM BR AR CL PE BO PY UY CO VE EC GY SR GF PA CR NI HN SV GT BZ CU DO HT JM TT BB BS GD LC VC AG DM KN PR VI BM GL FO AI AW CW SX BQ KY TC VG MS FK GI JE GG IM AX SJ PM PF NC WF FJ PG SB VU WS TO KI TV NR PW FM MH CK NU TK GU MP AS UM CC CX NF HM TF AQ BV SH IO PS EH".split(" ");
  let display=null;try{display=new Intl.DisplayNames([navigator.language||"en"],{type:"region"})}catch(_){}
  codes.map(code=>({code,name:display?.of(code)||code})).sort((a,b)=>a.name.localeCompare(b.name)).forEach(x=>{
    const o=document.createElement("option");o.value=x.code;o.textContent=x.name;select.appendChild(o);
  });
}
function showError(field,message){
  const status=$("#checkoutStatus");
  if(status){status.textContent=message;status.classList.add("error")}
  $$(".checkout-field-error").forEach(el=>el.classList.remove("checkout-field-error"));
  if(field){
    field.classList.add("checkout-field-error");
    field.closest(".checkout-card")?.scrollIntoView({behavior:"smooth",block:"center"});
  }else status?.scrollIntoView({behavior:"smooth",block:"center"});
}
function validate(form){
  const required=$$("[required]",form);
  for(const el of required){
    if(el.type==="checkbox"&&!el.checked)return [el,"Please accept the terms before continuing."];
    if(el.type==="email"){
      const value=el.value.trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))return [el,"Please enter a valid email address before continuing."];
    }else if(el.type!=="checkbox"&&!String(el.value||"").trim()){
      const label=el.closest(".field")?.querySelector("label")?.textContent?.replace(/Optional/gi,"").trim()||"required field";
      return [el,"Please complete "+label+" before continuing."];
    }
  }
  return null;
}
function savePaymentOrder(){
  const lines=buildOrderLines(),subtotal=subtotalOf(lines),method=chosenMethod(subtotal),shipping=shippingCost(method,subtotal);
  const order={createdAt:Date.now(),items:lines,subtotal,shipping,shippingMethod:method,total:subtotal+shipping};
  localStorage.setItem(ORDER_KEY,JSON.stringify(order));
  return order;
}
function init(){
  const form=$("#checkoutForm");if(!form)return;
  const lines=buildOrderLines();
  if(!lines.length){location.replace("cart.html");return}
  populateCountries();
  restoreData(form);
  const crypto=$('input[name="payment"][value="crypto"]',form);
  if(crypto){
    crypto.checked=true;
    crypto.closest('.checkout-method')?.classList.add('selected');
  }
  const subtotal=subtotalOf(lines);
  const restoredShip=$('input[name="ship"]:checked',form)?.value;
  if(restoredShip&&availableMethod(restoredShip,subtotal))localStorage.setItem(SHIP_KEY,restoredShip);
  syncShipping(lines);
  renderSummary();

  $("#shippingMethods")?.addEventListener("click",e=>{
    const card=e.target.closest(".checkout-method");if(!card)return;
    const radio=$('input[name="ship"]',card);if(!radio||radio.disabled)return;
    radio.checked=true;
    localStorage.setItem(SHIP_KEY,radio.value);
    saveData(form);
    renderSummary();
  });
  form.addEventListener("change",e=>{
    saveData(form);
    if(e.target.matches('input[name="ship"]')){
      localStorage.setItem(SHIP_KEY,e.target.value);
      renderSummary();
    }
  });
  form.addEventListener("input",()=>saveData(form));
  form.addEventListener("submit",e=>{
    e.preventDefault();e.stopImmediatePropagation();
    const status=$("#checkoutStatus");if(status){status.textContent="";status.classList.remove("error")}
    const bad=validate(form);
    if(bad){showError(bad[0],bad[1]);return}
    const order=savePaymentOrder();
    if(!order.items.length){showError(null,"Your cart is empty. Add a product before continuing.");return}
    saveData(form);
    if(status)status.textContent="Opening payment…";
    location.href="crypto-payment.html";
  },true);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();