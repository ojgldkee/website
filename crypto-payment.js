(() => {
"use strict";
const COINS=[
 {symbol:"BTC",name:"Bitcoin",id:"bitcoin",network:"Bitcoin",precision:8},
 {symbol:"ETH",name:"Ethereum",id:"ethereum",network:"Ethereum",precision:8},
 {symbol:"USDT",name:"Tether",id:"tether",network:"Ethereum · ERC-20",precision:6},
 {symbol:"USDC",name:"USD Coin",id:"usd-coin",network:"Ethereum · ERC-20",precision:6},
 {symbol:"SOL",name:"Solana",id:"solana",network:"Solana",precision:8},
 {symbol:"LTC",name:"Litecoin",id:"litecoin",network:"Litecoin",precision:8},
 {symbol:"XRP",name:"XRP",id:"ripple",network:"XRP Ledger",precision:6},
 {symbol:"BNB",name:"BNB",id:"binancecoin",network:"BNB Smart Chain",precision:8},
 {symbol:"XMR",name:"Monero",id:"monero",network:"Monero",precision:8}
];
// Configure receiving addresses only after completing legal/compliance and business verification.
// Do not put wallet private keys, seed phrases, merchant secrets, or customer data in this public file.
const WALLETS={BTC:"",ETH:"",USDT:"",USDC:"",SOL:"",LTC:"",XRP:"",BNB:"",XMR:""};
const $=s=>document.querySelector(s),fmt=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);
const cartKey="forma-cart-v2";
const state={coin:COINS[0],usd:0,rates:{},expiresAt:0,quoteAmount:null,ready:false,quoteFetchedAt:0,interval:null,priceSource:""};
function getCart(){
 let lines=[];try{lines=JSON.parse(localStorage.getItem(cartKey)||"[]")}catch(_){}
 if(!Array.isArray(lines))return [];
 const products=Array.isArray(window.PRODUCTS)?window.PRODUCTS:[];
 return lines.map(line=>{
  const p=products.find(x=>x.slug===line.slug||(line.slug==="etatrutide"&&x.slug==="retatrutide"));
  if(!p)return null;
  const variants=Array.isArray(p.variants)&&p.variants.length?p.variants:[{label:"Standard",price:p.price}];
  const v=variants.find(x=>x.label===line.variant)||variants[0];
  return {p,v,qty:Math.max(1,Math.floor(Number(line.qty)||1)),total:Number(v.price)*Math.max(1,Math.floor(Number(line.qty)||1))};
 }).filter(Boolean);
}
function orderSummary(){
 const lines=getCart(),subtotal=lines.reduce((t,l)=>t+l.total,0),shipping=subtotal>=Number(window.STORE?.shippingThreshold||250)?0:7.95;
 state.usd=lines.length?subtotal+shipping:0;
 $("#cryptoOrderItems").replaceChildren();
 for(const l of lines){
  const row=document.createElement("div");row.className="crypto-order-line";
  const img=document.createElement("img");img.src=l.p.image;img.alt=l.p.name;
  const info=document.createElement("div");const name=document.createElement("strong");name.textContent=l.p.name;
  const desc=document.createElement("small");desc.textContent=l.v.label+" · Qty "+l.qty;info.append(name,desc);
  const price=document.createElement("span");price.textContent=fmt(l.total);
  row.append(img,info,price);$("#cryptoOrderItems").append(row);
 }
 if(!lines.length){const empty=document.createElement("p");empty.textContent="Your cart is empty. Return to the store before continuing.";empty.style.color="#768579";$("#cryptoOrderItems").append(empty)}
 $("#cryptoSubtotal").textContent=fmt(subtotal);$("#cryptoShipping").textContent=shipping===0?"Free":fmt(shipping);
 $("#cryptoGrandTotal").textContent=fmt(state.usd);$("#cryptoTotalInline").textContent=fmt(state.usd);
}
function coinUI(){
 const holder=$("#cryptoCoins");holder.replaceChildren();
 for(const c of COINS){
  const b=document.createElement("button");b.type="button";b.className="crypto-coin"+(state.coin.symbol===c.symbol?" selected":"");
  b.setAttribute("role","radio");b.setAttribute("aria-checked",String(state.coin.symbol===c.symbol));
  const mark=document.createElement("span");mark.className="crypto-coin-badge";mark.textContent=c.symbol==="BTC"?"₿":c.symbol==="ETH"?"Ξ":c.symbol==="XRP"?"✕":c.symbol==="SOL"?"◎":c.symbol;
  const copy=document.createElement("span"),name=document.createElement("span"),net=document.createElement("span");
  name.className="crypto-coin-name";name.textContent=c.name;net.className="crypto-coin-network";net.textContent=c.network;copy.append(name,net);b.append(mark,copy);
  b.onclick=()=>{state.coin=c;coinUI();applyQuote(true)};holder.append(b);
 }
}
function amountString(amount,c){
 if(!Number.isFinite(amount)||amount<=0)return "—";
 return Number(amount).toLocaleString("en-US",{useGrouping:false,maximumFractionDigits:c.precision});
}
function setRateStatus(message,failed=false){
 $("#cryptoRateStatus").textContent=message;
 $("#cryptoLiveDot").classList.toggle("failed",failed);
}
function resetQuote(message){
 state.quoteAmount=null;state.expiresAt=0;state.ready=false;
 $("#cryptoAmount").textContent="—";$("#cryptoClock").textContent="--:--";
 setRateStatus(message||"Rates are not available right now.",true);
 $("#cryptoTimeNote").textContent="Try refreshing the quote. No payment address is active.";
 $("#cryptoTimerFill").style.width="0%";
 showWallet();
}
function applyQuote(reset=true){
 const c=state.coin,rate=Number(state.rates[c.id]?.usd||0);
 $("#cryptoSymbol").textContent=c.symbol;
 if(!Number.isFinite(rate)||rate<=0){
  resetQuote("Selected currency rate unavailable. Try refreshing.");
  $("#cryptoSpotRate").textContent="Rate unavailable";return;
 }
 $("#cryptoSpotRate").textContent="1 "+c.symbol+" ≈ "+fmt(rate)+" · "+c.network;
 const updatedAt=Number(state.rates[c.id]?.last_updated_at||0);
 const updatedText=updatedAt?"Updated "+new Date(updatedAt*1000).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):"Current market estimate";
 setRateStatus("Rate loaded · "+state.priceSource+" · "+updatedText);
 if(!state.usd){
  state.ready=false;state.quoteAmount=null;state.expiresAt=0;
  $("#cryptoAmount").textContent="—";$("#cryptoClock").textContent="--:--";
  $("#cryptoTimerFill").style.width="0%";
  $("#cryptoTimeNote").textContent="Add items to your cart to calculate an estimated 30-minute crypto quote.";
  showWallet();return;
 }
 if(reset||!state.quoteAmount||!state.expiresAt){
  state.quoteAmount=state.usd/rate;state.expiresAt=Date.now()+1800000;
 }
 state.ready=true;
 $("#cryptoAmount").textContent=amountString(state.quoteAmount,c);
 $("#cryptoTimeNote").textContent="30-minute market estimate only; a backend is required for a guaranteed locked invoice.";
 tick();showWallet();
}
function tick(){
 if(!state.ready)return;
 const remaining=Math.max(0,state.expiresAt-Date.now());
 const sec=Math.ceil(remaining/1000);
 $("#cryptoClock").textContent=String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0");
 $("#cryptoTimerFill").style.width=(remaining/18000)+"%";
 if(!remaining){
  state.ready=false;state.quoteAmount=null;
  $("#cryptoRateStatus").textContent="Quote expired · refresh to recalculate";
  $("#cryptoTimeNote").textContent="The 30-minute estimate has expired. Refresh the quote.";
  $("#cryptoAmount").textContent="—";showWallet();
 }
}
async function fetchWithTimeout(url,ms=9000){
 const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),ms);
 try{
  const res=await fetch(url,{cache:"no-store",signal:ctl.signal,headers:{Accept:"application/json"}});
  if(!res.ok)throw new Error("HTTP "+res.status);
  return await res.json();
 }finally{clearTimeout(timer)}
}
async function fetchCoinLore(){
 const json=await fetchWithTimeout("https://api.coinlore.net/api/tickers/?start=0&limit=100",8500);
 if(!Array.isArray(json?.data))throw new Error("CoinLore response missing data");
 const rates={},now=Math.floor(Date.now()/1000);
 for(const c of COINS){
  const entry=json.data.find(x=>x.symbol===c.symbol&&Number(x.price_usd)>0);
  if(entry)rates[c.id]={usd:Number(entry.price_usd),last_updated_at:now};
 }
 if(!rates.bitcoin?.usd)throw new Error("Bitcoin not returned");
 return {rates,source:"CoinLore"};
}
async function fetchCoinGecko(){
 const ids=COINS.map(c=>c.id).join(",");
 const url="https://api.coingecko.com/api/v3/simple/price?ids="+encodeURIComponent(ids)+"&vs_currencies=usd&include_last_updated_at=true";
 const json=await fetchWithTimeout(url);
 if(!json?.bitcoin?.usd)throw new Error("Incomplete CoinGecko response");
 return {rates:json,source:"CoinGecko"};
}
async function fetchCryptoCompare(){
 const syms=COINS.map(c=>c.symbol).join(",");
 const url="https://min-api.cryptocompare.com/data/pricemulti?fsyms="+encodeURIComponent(syms)+"&tsyms=USD";
 const json=await fetchWithTimeout(url);
 if(!json?.BTC?.USD)throw new Error("Incomplete CryptoCompare response");
 const rates={};const now=Math.floor(Date.now()/1000);
 for(const c of COINS){
  const price=Number(json[c.symbol]?.USD);
  if(Number.isFinite(price)&&price>0)rates[c.id]={usd:price,last_updated_at:now};
 }
 return {rates,source:"CryptoCompare"};
}
async function fetchRates(){
 const button=$("#cryptoRefresh");button.disabled=true;
 setRateStatus("Loading current market prices…");
 const providers=[fetchCoinLore,fetchCryptoCompare,fetchCoinGecko],failures=[];
 try{
  const combined={},sources=[];
  for(const provider of providers){
   try{
    const response=await provider();
    for(const coin of COINS){
     const entry=response.rates?.[coin.id];
     if(!combined[coin.id]&&Number(entry?.usd)>0)combined[coin.id]=entry;
    }
    sources.push(response.source);
    if(COINS.every(coin=>Number(combined[coin.id]?.usd)>0))break;
   }catch(err){failures.push(String(err?.message||"Network error"))}
  }
  if(!Object.keys(combined).length)throw new Error(failures.join(" | ")||"Market feeds unavailable");
  state.rates=combined;state.priceSource=sources.join(" + ");
  applyQuote(true);
 }catch(e){
  resetQuote("Live prices could not be loaded. Try again.");
  $("#cryptoSpotRate").textContent="Price lookup failed. A server-side rate service is needed if your browser blocks the public feeds.";
  console.warn("Crypto rate providers:",e);
 }finally{button.disabled=false}
}
function showWallet(){
 const wallet=WALLETS[state.coin.symbol]||"";
 const active=Boolean(wallet&&state.ready&&state.usd);
 $("#cryptoWalletEmpty").hidden=active;$("#cryptoWalletReady").hidden=!active;
 $("#cryptoTxHash").disabled=!active;
 // Never enable a simulated "payment complete" flow without a verified order database.
 $("#cryptoSubmit").disabled=true;
 if(active){
  $("#cryptoAddress").textContent=wallet;$("#cryptoNetworkLabel").textContent=state.coin.network;
  $("#cryptoTagNote").textContent=state.coin.symbol==="XRP"?"An XRP destination tag may be required; configure it alongside the wallet before accepting payment.":"Verify the address and network before making any transfer.";
 }
}

function initWizard(){
 let step=1,maxReached=1;
 const panels=[...document.querySelectorAll(".crypto-wizard-panel")];
 const tabs=[...document.querySelectorAll(".crypto-progress-tab")];
 const go=(next)=>{
  if(![1,2,3].includes(next)||next>maxReached+1)return;
  step=next;maxReached=Math.max(maxReached,step);
  panels.forEach(panel=>{panel.hidden=Number(panel.dataset.step)!==step;});
  tabs.forEach(tab=>{
   const n=Number(tab.dataset.goStep);
   tab.classList.toggle("is-current",n===step);
   tab.classList.toggle("is-done",n<step);
   tab.setAttribute("aria-current",n===step?"step":"false");
   tab.disabled=n>maxReached;
  });
  const isReview=step===2;
  if(isReview&&!Number(state.rates[state.coin.id]?.usd))fetchRates();
  const intro=document.querySelector(".crypto-progress");
  if(intro)intro.scrollIntoView({behavior:"smooth",block:"start"});
 };
 document.querySelector("#cryptoNext1").onclick=()=>go(2);
 document.querySelector("#cryptoPrev2").onclick=()=>go(1);
 document.querySelector("#cryptoNext2").onclick=()=>go(3);
 document.querySelector("#cryptoPrev3").onclick=()=>go(2);
 tabs.forEach(t=>t.addEventListener("click",()=>go(Number(t.dataset.goStep))));
 go(1);
}

document.addEventListener("DOMContentLoaded",()=>{
 orderSummary();coinUI();showWallet();
 initWizard();
 $("#cryptoRefresh").onclick=fetchRates;
 $("#cryptoCopy").onclick=async()=>{try{await navigator.clipboard.writeText($("#cryptoAddress").textContent);$("#cryptoCopy").textContent="Copied";setTimeout(()=>$("#cryptoCopy").textContent="Copy",1800)}catch(_){$("#cryptoCopy").textContent="Select & copy"}};
 $("#cryptoSubmit").onclick=()=>{$("#cryptoSubmissionStatus").textContent="Manual payment submission needs a secure backend before it can accept transactions."};
 state.interval=setInterval(tick,1000);
 fetchRates();
});
})();