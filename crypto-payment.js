(() => {"use strict";
const COINS=[
 {symbol:"BTC",name:"Bitcoin",id:"bitcoin",network:"Bitcoin",precision:8,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/btc.svg"},
 {symbol:"ETH",name:"Ethereum",id:"ethereum",network:"Ethereum",precision:8,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/eth.svg"},
 {symbol:"USDT",name:"Tether",id:"tether",network:"Ethereum · ERC-20",precision:6,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/usdt.svg"},
 {symbol:"USDC",name:"USD Coin",id:"usd-coin",network:"Ethereum · ERC-20",precision:6,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/usdc.svg"},
 {symbol:"SOL",name:"Solana",id:"solana",network:"Solana",precision:8,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/sol.svg"},
 {symbol:"LTC",name:"Litecoin",id:"litecoin",network:"Litecoin",precision:8,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/ltc.svg"},
 {symbol:"BNB",name:"BNB",id:"binancecoin",network:"BNB Smart Chain",precision:8,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/bnb.svg"},
 {symbol:"XMR",name:"Monero",id:"monero",network:"Monero",precision:8,logo:"https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/xmr.svg"}
];
// Public receiving addresses only. Never add seeds, private keys, or API secrets.
// To activate a real merchant invoice, a secure order backend is also required.
const WALLETS={
 BTC:"bc1qeeltwzzfd2dp4xtvpsja0ndkagtsu7urweh2a5",
 ETH:"0xAE80ce99508A70cDb1947a79e12CEe98B74efD55",
 USDT:"0xAE80ce99508A70cDb1947a79e12CEe98B74efD55",
 USDC:"",
 SOL:"NFLLRyuyc43avwW83pRmZZNwNT5TJH3B9Hcac64PM8x",
 LTC:"ltc1ql55pjj969y699fj6w4sf53tfgxcxuq2zx4qf37",
 BNB:"0xAE80ce99508A70cDb1947a79e12CEe98B74efD55",
 XMR:"4AZ4p2MyR5rBoSdgbEiJNsdcaVgYApXkgBATAa8LkVSWi7XioyrjEW6MRKER3wus5tc2Pv8iGXNW6PU2USYsrBK7HLFBnTJ"
};
const $=s=>document.querySelector(s),money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);
const requestedMethod=new URLSearchParams(location.search).get("method");
const state={coin:COINS[0],rates:{},source:"",total:0,hasOrder:false,expiresAt:0,quoted:null,quoteCoin:"",timer:null,loading:false,shippingMethod:"standard",paymentMethod:requestedMethod==="cashapp-btc"?"cashapp-btc":"crypto",orderId:""};
const formatCrypto=(n,c)=>Number.isFinite(n)&&n>0?n.toFixed(c.precision).replace(/0+$/,"").replace(/\.$/,""):"—";
function cartTotals(){
 const products=Array.isArray(window.PRODUCTS)?window.PRODUCTS:[];
 let details=[],subtotal=0,count=0,shippingMethod="standard",shipping=0,total=0;

 try{
   const snap=JSON.parse(localStorage.getItem("aspen-labs-payment-order-v1")||"null");
   if(snap&&Array.isArray(snap.items)&&snap.items.length&&Number(snap.total)>0){
     details=snap.items.map(x=>({name:x.name,variant:x.variant||"",qty:Math.max(1,Number(x.qty)||1)}));
     count=snap.items.reduce((n,x)=>n+Math.max(1,Number(x.qty)||1),0);
     subtotal=Number(snap.subtotal)||0;
     shipping=Number(snap.shipping)||0;
     shippingMethod=snap.shippingMethod||"standard";
     total=Number(snap.total)||subtotal+shipping;
   }
 }catch(_){}

 if(!details.length){
   let list=[];
   for(const key of ["aspen-labs-cart-v2","aspen-labs-cart-backup-v1","forma-cart-v2"]){
     try{
       const v=JSON.parse(localStorage.getItem(key)||"[]");
       if(Array.isArray(v)&&v.length){list=v;break}
     }catch(_){}
   }
   for(const line of list){
     const p=products.find(p=>p.slug===line.slug);if(!p)continue;
     const variant=(p.variants||[]).find(v=>v.label===line.variant)||(p.variants||[])[0];
     const price=Number(variant?.price??p.price),qty=Math.min(100,Math.max(1,Number(line.qty)||1));
     if(!Number.isFinite(price)||price<0)continue;
     subtotal+=price*qty;count+=qty;
     details.push({name:p.name,variant:variant?.label||"",qty});
   }
   shippingMethod=localStorage.getItem("aspen-checkout-shipping-method")||"standard";
   const threshold=Number(window.STORE?.shippingThreshold||250);
   shipping=shippingMethod==="priority"?14.99:(shippingMethod==="free"&&subtotal>=threshold?0:4.99);
   total=subtotal+shipping;
 }
 state.shippingMethod=shippingMethod;
 state.hasOrder=count>0;
 state.total=state.hasOrder?Math.round(total*100)/100:0;
 $("#chooseTotal").textContent=state.hasOrder?money(state.total):"No order";
 $("#invoiceUsd").textContent=state.hasOrder?"Order total "+money(state.total):"No order in cart";
 const orderNode=$("#cashAppOrderId");if(orderNode)orderNode.textContent=state.orderId||"—";
 const root=$("#payOrderProducts");root.replaceChildren();
 const heading=document.createElement("span");heading.className="pay-products-label";heading.textContent="IN YOUR ORDER";root.append(heading);
 if(!details.length){
  const msg=document.createElement("span");msg.className="pay-product-entry";msg.textContent="Your cart is empty";root.append(msg);
  $("#payOrderSubtitle").textContent="Choose a cryptocurrency to see payment instructions.";
  return;
 }
 for(const item of details.slice(0,3)){
  const line=document.createElement("span");line.className="pay-product-entry";
  line.textContent=item.name+(item.variant?" · "+item.variant:"")+(item.qty>1?" × "+item.qty:"");
  root.append(line);
 }
 if(details.length>3){const extra=document.createElement("span");extra.className="pay-product-entry";extra.textContent="+"+(details.length-3)+" more";root.append(extra)}
 $("#payOrderSubtitle").textContent=count===1?"1 item in your order · Choose your cryptocurrency":count+" items in your order · Choose your cryptocurrency";
}
function coinLogo(c,large=false){
 const wrap=document.createElement("span");wrap.className="coin-logo"+(large?" coin-logo-large":"");
 const img=document.createElement("img");img.src=c.logo;img.alt="";img.loading="eager";img.decoding="async";
 wrap.appendChild(img);return wrap;
}
function makeList(){
 const root=$("#payCoinList");root.replaceChildren();
 for(const coin of COINS){
  const available=Boolean(WALLETS[coin.symbol]);
  const btn=document.createElement("button");btn.type="button";btn.className="coin-row"+(available?"":" coin-row-disabled");btn.disabled=!available;
  btn.setAttribute("aria-label",available?"Pay with "+coin.name:coin.name+" wallet not configured");
  const logo=coinLogo(coin);
  const name=document.createElement("strong");name.className="coin-title";name.textContent=coin.name;
  const network=document.createElement("small");network.className="coin-network";network.textContent=coin.network;
  const quote=document.createElement("span");quote.className="coin-conversion";const rate=Number(state.rates[coin.id]||0);
  quote.textContent=!available?"Wallet setup needed":rate>0&&state.hasOrder?formatCrypto(state.total/rate,coin)+" "+coin.symbol:rate>0?"View rate":"Rate loading…";
  btn.append(logo,name,network,quote);if(available)btn.onclick=()=>openInvoice(coin);root.append(btn);
 }
}
function selectScreen(screen){
 $("#payChoose").hidden=screen!=="choose";$("#payInvoice").hidden=screen!=="invoice";
 window.scrollTo({top:0,behavior:"instant"});
}
function updateClock(){
 const rest=state.expiresAt?Math.max(0,state.expiresAt-Date.now()):0,sec=Math.ceil(rest/1000);
 $("#invoiceClock").textContent=state.expiresAt?String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0"):"--:--";
 $("#invoiceTimerBar").style.width=(state.expiresAt?rest/3600000*100:0)+"%";
 if(state.expiresAt&&!rest&&!state.loading){
  state.expiresAt=0;state.quoted=null;
  $("#invoiceClock").textContent="Updating";
  $("#invoicePaymentStatus").textContent="Updating exchange rate…";
  $("#invoiceAmount").textContent="—";$("#walletAmount").value="—";
  $("#copyAmount").disabled=true;$("#copyWalletAmount").disabled=true;
  loadRates();
 }
}
function disableWallet(){
 $("#walletAddress").value="Not configured";
 $("#copyWallet").disabled=true;$("#qrPlaceholder").hidden=false;$("#qrCode").hidden=true;
 $("#qrCaption").textContent="Wallet not configured. Do not send any funds.";
 $("#invoiceStatus").textContent="Unavailable";
}
function paymentUri(c,address,amount){
 if(c.symbol==="BTC")return "bitcoin:"+address+"?amount="+encodeURIComponent(amount);
 if(c.symbol==="LTC")return "litecoin:"+address+"?amount="+encodeURIComponent(amount);
 if(c.symbol==="XMR")return "monero:"+address+"?tx_amount="+encodeURIComponent(amount);
 if(c.symbol==="SOL")return "solana:"+address;
 return address;
}
function renderQR(address,amount,c){
 const node=$("#qrCode");node.replaceChildren();node.hidden=false;$("#qrPlaceholder").hidden=true;
 if(typeof QRCode!=="function"){node.hidden=true;$("#qrPlaceholder").hidden=false;$("#qrCaption").textContent="QR generator unavailable. Copy the wallet address manually.";return}
 try{
  new QRCode(node,{text:paymentUri(c,address,amount),width:220,height:220,colorDark:"#082d20",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M});
  $("#qrCaption").textContent="Scan with your "+c.name+" wallet. Verify the network and amount before sending.";
 }catch(e){
  node.hidden=true;$("#qrPlaceholder").hidden=false;$("#qrCaption").textContent="QR unavailable. Copy the wallet address manually.";
 }
}
function invoiceDetails(){
 const c=state.coin,rate=Number(state.rates[c.id]||0),cashApp=state.paymentMethod==="cashapp-btc";
 $("#invoiceCoinName").textContent=c.name;$("#invoiceSymbol").textContent=c.symbol;
 $("#invoiceNetwork").textContent=c.network;$("#walletAmountCoin").textContent=c.symbol;
 const logo=$("#invoiceCoinLogo");logo.replaceChildren();const logoImg=document.createElement("img");logoImg.src=c.logo;logoImg.alt="";logoImg.decoding="async";logo.appendChild(logoImg);
 $("#networkWarningTitle").textContent=cashApp?"Bitcoin network only":"Send only "+c.symbol+" on "+c.network;
 const address=WALLETS[c.symbol];
 const valid=Boolean(state.hasOrder&&state.expiresAt>Date.now()&&state.quoted>0&&rate>0);
 const amount=valid?formatCrypto(state.quoted,c):"—";
 $("#invoiceAmount").textContent=amount;$("#walletAmount").value=amount;
 $("#copyAmount").disabled=!valid;$("#copyWalletAmount").disabled=!valid;
 if(address&&valid){
  $("#walletAddress").value=address;$("#copyWallet").disabled=false;
  $("#invoiceStatus").textContent="Ready";
  $("#invoicePaymentStatus").textContent="Waiting for payment";
  renderQR(address,amount,c);
  if(cashApp){
    $("#qrCaption").textContent="Scan this QR code from Cash App Bitcoin, or copy the Aspen Labs BTC address below.";
  }
 }else{
  disableWallet();
  $("#invoicePaymentStatus").textContent=!state.hasOrder?"No order in cart":!valid?"Waiting for current quote":"Wallet setup required";
 }
 updateClock();
}
function openInvoice(c){
 state.coin=c;
 const rate=Number(state.rates[c.id]||0);
 // Keep an existing quote when returning from payment view, but never fake an exchange price.
 if(c.symbol!==state.quoteCoin||!state.expiresAt||state.expiresAt<=Date.now()){
  state.quoted=rate>0&&state.hasOrder?state.total/rate:null;
  state.expiresAt=state.quoted?Date.now()+3600000:0;state.quoteCoin=c.symbol;
 }
 invoiceDetails();selectScreen("invoice");
}
async function copy(text,button){
 if(!text||text==="—"||text==="Not configured")return;
 const success=()=>{const old=button.textContent;button.textContent="✓";button.classList.add("copied");setTimeout(()=>{button.textContent=old;button.classList.remove("copied")},1400)};
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);success();return}}catch(_){}
 try{const ta=document.createElement("textarea");ta.value=text;ta.readOnly=true;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,text.length);const ok=document.execCommand("copy");ta.remove();if(ok){success();return}}catch(_){}
 button.title="Copy unavailable. Press and hold the value to copy.";
}
async function json(url,timeout=6500){
 const ctrl=new AbortController(),t=setTimeout(()=>ctrl.abort(),timeout);
 try{const response=await fetch(url,{cache:"no-store",signal:ctrl.signal});if(!response.ok)throw Error("HTTP "+response.status);return await response.json()}finally{clearTimeout(t)}
}
async function sourceCoinLore(){
 const d=await json("https://api.coinlore.net/api/tickers/?start=0&limit=100");
 if(!Array.isArray(d.data))throw Error("Missing data");
 const rates={};for(const c of COINS){const v=d.data.find(x=>x.symbol===c.symbol&&Number(x.price_usd)>0);if(v)rates[c.id]=Number(v.price_usd)}
 if(!rates.bitcoin)throw Error("No BTC");return {rates,name:"CoinLore"};
}
async function sourceCryptoCompare(){
 const d=await json("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDT,USDC,SOL,LTC,BNB,XMR&tsyms=USD");
 const rates={};for(const c of COINS){const v=Number(d[c.symbol]?.USD);if(v>0)rates[c.id]=v}
 if(!rates.bitcoin)throw Error("No BTC");return {rates,name:"CryptoCompare"};
}
async function sourceCoinGecko(){
 const ids=COINS.map(c=>c.id).join(",");
 const d=await json("https://api.coingecko.com/api/v3/simple/price?ids="+ids+"&vs_currencies=usd");
 const rates={};for(const c of COINS){const v=Number(d[c.id]?.usd);if(v>0)rates[c.id]=v}
 if(!rates.bitcoin)throw Error("No BTC");return {rates,name:"CoinGecko"};
}
async function loadRates(){
 if(state.loading)return;state.loading=true;
 $("#payRateStatus").textContent="Loading current market prices…";
 const combined={},sources=[];
 try{
  const responses=await Promise.allSettled([sourceCoinLore(),sourceCoinGecko()]);
  for(const r of responses){
   if(r.status!=="fulfilled")continue;
   sources.push(r.value.name);
   for(const [id,price] of Object.entries(r.value.rates))if(!combined[id]&&Number(price)>0)combined[id]=price;
  }
  state.rates=combined;state.source=sources.join(", ");
  $("#payRateStatus").textContent=sources.length?"Live market rates · "+new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):"Live rates are reconnecting…";
  makeList();
  if(state.paymentMethod==="cashapp-btc"&&state.hasOrder){
   openInvoice(COINS[0]);
  }else if(!$("#payInvoice").hidden){
   const rate=Number(state.rates[state.coin.id]||0);
   state.quoted=rate>0&&state.hasOrder?state.total/rate:null;
   state.expiresAt=state.quoted?Date.now()+3600000:0;
   invoiceDetails();
  }
  if(!sources.length)setTimeout(loadRates,15000);
 }finally{state.loading=false}
}
document.addEventListener("DOMContentLoaded",()=>{
 cartTotals();makeList();disableWallet();

 const cashApp=state.paymentMethod==="cashapp-btc";
 if(cashApp){
   $("#payHeaderStatus").textContent="Cash App — Bitcoin";
   $("#changeCurrency").hidden=true;
   $("#cashAppGuide").hidden=false;
   $("#cashAppOrderRow").hidden=false;
   $("#cashAppSentButton").hidden=false;
   $("#cashAppNote").hidden=false;
   $("#invoiceHeading").innerHTML='Pay with <em>Cash App.</em>';
   $("#invoiceDescription").textContent="Send Bitcoin from Cash App using the exact amount and Aspen Labs BTC address below.";
 }else{
   $("#changeCurrency").hidden=false;
 }

 $("#changeCurrency").onclick=()=>selectScreen("choose");
 $("#copyWallet").onclick=()=>copy($("#walletAddress").value,$("#copyWallet"));
 $("#copyAmount").onclick=()=>copy($("#walletAmount").value,$("#copyAmount"));
 $("#copyWalletAmount").onclick=()=>copy($("#walletAmount").value,$("#copyWalletAmount"));

 const sent=$("#cashAppSentButton");
 if(sent)sent.onclick=()=>{
   if(!state.hasOrder||state.coin.symbol!=="BTC"||!state.quoted||state.expiresAt<=Date.now()){
     $("#cashAppSentStatus").textContent="Your BTC quote is not ready. Wait for the current amount and address before sending.";
     return;
   }
   try{
     const order=JSON.parse(localStorage.getItem("aspen-labs-payment-order-v1")||"null");
     if(order){
       order.paymentMethod="cashapp-btc";
       order.paymentStatus="payment-submitted-manual-review";
       order.paymentSubmittedAt=Date.now();
       order.paymentCoin="BTC";
       order.paymentAddress=WALLETS.BTC;
       order.paymentAmount=formatCrypto(state.quoted,COINS[0]);
       localStorage.setItem("aspen-labs-payment-order-v1",JSON.stringify(order));
     }
   }catch(_){}
   sent.disabled=true;
   sent.textContent="Payment submitted ✓";
   $("#invoicePaymentStatus").textContent="Submitted for verification";
   $("#cashAppSentStatus").textContent="Payment submitted for manual verification. Keep your Cash App transaction details until your order is confirmed.";
 };

 state.timer=setInterval(updateClock,1000);
 loadRates();
});
})();