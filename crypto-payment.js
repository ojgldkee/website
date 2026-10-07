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
const state={coin:COINS[0],usd:0,rates:{},expiresAt:0,quoteAmount:null,ready:false,quoteFetchedAt:0,interval:null};
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
 return amount.toFixed(c.precision).replace(/0+$/,"").replace(/\.$/,"");
}
function resetQuote(){
 state.quoteAmount=null;state.expiresAt=0;state.ready=false;
 $("#cryptoAmount").textContent="—";$("#cryptoClock").textContent="--:--";
 $("#cryptoRateStatus").textContent="Live price not available. Try again.";
 $("#cryptoTimeNote").textContent="No quote is active. Refresh to retrieve a new market estimate.";
 $("#cryptoTimerFill").style.width="0%";
}
function applyQuote(reset){
 $("#cryptoSymbol").textContent=state.coin.symbol;
 const rate=Number(state.rates[state.coin.id]?.usd||0);
 const age=Math.floor(Date.now()/1000)-Number(state.rates[state.coin.id]?.last_updated_at||0);
 if(!rate||!state.usd||age>600||age< -120){resetQuote();$("#cryptoSpotRate").textContent="Quote unavailable";showWallet();return}
 if(reset||!state.quoteAmount){
  state.quoteAmount=state.usd/rate;
  state.expiresAt=Date.now()+30*60*1000;
 }
 state.ready=true;
 $("#cryptoAmount").textContent=amountString(state.quoteAmount,state.coin);
 $("#cryptoSpotRate").textContent="1 "+state.coin.symbol+" ≈ "+fmt(rate)+" · "+state.coin.network;
 $("#cryptoRateStatus").textContent="Rate retrieved · "+new Date(Number(state.rates[state.coin.id]?.last_updated_at||Math.floor(Date.now()/1000))*1000).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});
 $("#cryptoTimeNote").textContent="30-minute preview quote. Rates are estimates until confirmed by your payment backend.";
 tick();showWallet();
}
function tick(){
 if(!state.ready)return;
 const remaining=Math.max(0,state.expiresAt-Date.now()),sec=Math.ceil(remaining/1000);
 $("#cryptoClock").textContent=String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0");
 $("#cryptoTimerFill").style.width=String(remaining/1800000*100)+"%";
 if(!remaining){
  state.ready=false;state.quoteAmount=null;
  $("#cryptoRateStatus").textContent="Quote expired · refresh to recalculate";
  $("#cryptoTimeNote").textContent="The 30-minute quote window has ended. Refresh the quote to continue.";
  $("#cryptoAmount").textContent="—";showWallet();
 }
}
async function fetchRates(){
 const b=$("#cryptoRefresh");b.disabled=true;
 $("#cryptoRateStatus").textContent="Fetching current exchange rates…";
 try{
  const ids=COINS.map(c=>c.id).join(",");
  const url="https://api.coingecko.com/api/v3/simple/price?ids="+encodeURIComponent(ids)+"&vs_currencies=usd&include_last_updated_at=true";
  const res=await fetch(url,{cache:"no-store",headers:{Accept:"application/json"}});
  if(!res.ok)throw new Error("Provider unavailable ("+res.status+")");
  const rates=await res.json();if(!rates||typeof rates!=="object")throw new Error("Invalid market data");
  state.rates=rates;applyQuote(true);
 }catch(e){
  resetQuote();$("#cryptoRateStatus").textContent="Live rates unavailable. Try refresh.";$("#cryptoSpotRate").textContent=String(e.message||"Connection error");
 }finally{b.disabled=false}
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
document.addEventListener("DOMContentLoaded",()=>{
 orderSummary();coinUI();showWallet();
 $("#cryptoRefresh").onclick=fetchRates;
 $("#cryptoCopy").onclick=async()=>{try{await navigator.clipboard.writeText($("#cryptoAddress").textContent);$("#cryptoCopy").textContent="Copied";setTimeout(()=>$("#cryptoCopy").textContent="Copy",1800)}catch(_){$("#cryptoCopy").textContent="Select & copy"}};
 $("#cryptoSubmit").onclick=()=>{$("#cryptoSubmissionStatus").textContent="Manual payment submission needs a secure backend before it can accept transactions."};
 state.interval=setInterval(tick,1000);
 fetchRates();
});
})();