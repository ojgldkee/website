(() => {"use strict";
const COINS=[
 {symbol:"BTC",name:"Bitcoin",id:"bitcoin",network:"Bitcoin",precision:8,mark:"₿",bg:"#fff0d8",fg:"#e18a0d"},
 {symbol:"ETH",name:"Ethereum",id:"ethereum",network:"Ethereum",precision:8,mark:"Ξ",bg:"#e9edff",fg:"#586edb"},
 {symbol:"USDT",name:"Tether",id:"tether",network:"Ethereum · ERC-20",precision:6,mark:"₮",bg:"#ddf5e9",fg:"#169b71"},
 {symbol:"USDC",name:"USD Coin",id:"usd-coin",network:"Ethereum · ERC-20",precision:6,mark:"$",bg:"#e5efff",fg:"#316fcd"},
 {symbol:"SOL",name:"Solana",id:"solana",network:"Solana",precision:8,mark:"◎",bg:"#e9f5f0",fg:"#0c9871"},
 {symbol:"LTC",name:"Litecoin",id:"litecoin",network:"Litecoin",precision:8,mark:"Ł",bg:"#eaeef4",fg:"#657484"},
 {symbol:"XRP",name:"XRP",id:"ripple",network:"XRP Ledger",precision:6,mark:"✕",bg:"#e9edf0",fg:"#23333e"},
 {symbol:"BNB",name:"BNB",id:"binancecoin",network:"BNB Smart Chain",precision:8,mark:"◆",bg:"#fff4d5",fg:"#aa760c"},
 {symbol:"XMR",name:"Monero",id:"monero",network:"Monero",precision:8,mark:"ɱ",bg:"#fff0e4",fg:"#d66c30"}
];
// Public receiving addresses only. Never add seeds, private keys, or API secrets.
// To activate a real merchant invoice, a secure order backend is also required.
const WALLETS={BTC:"",ETH:"",USDT:"",USDC:"",SOL:"",LTC:"",XRP:"",BNB:"",XMR:""};
const $=s=>document.querySelector(s),money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);
const state={coin:COINS[0],rates:{},source:"",total:0,hasOrder:false,expiresAt:0,quoted:null,quoteCoin:"",timer:null,loading:false};
const formatCrypto=(n,c)=>Number.isFinite(n)&&n>0?n.toFixed(c.precision).replace(/0+$/,"").replace(/\.$/,""):"—";
function cartTotals(){
 let list=[];try{list=JSON.parse(localStorage.getItem("forma-cart-v2")||"[]")}catch(_){}
 if(!Array.isArray(list))list=[];
 const products=Array.isArray(window.PRODUCTS)?window.PRODUCTS:[];
 let subtotal=0,count=0;
 for(const line of list){
  const p=products.find(p=>p.slug===line.slug);if(!p)continue;
  const variant=(p.variants||[]).find(v=>v.label===line.variant)||(p.variants||[])[0];
  const price=Number(variant?.price??p.price);const qty=Math.min(100,Math.max(1,Number(line.qty)||1));
  if(!Number.isFinite(price)||price<0)continue;
  subtotal+=price*qty;count+=qty;
 }
 const shipping=subtotal>=Number(window.STORE?.shippingThreshold||250)?0:7.95;
 state.hasOrder=count>0;state.total=count?Math.round((subtotal+shipping)*100)/100:0;
 $("#chooseTotal").textContent=state.hasOrder?money(state.total):"No order";
 $("#invoiceUsd").textContent=state.hasOrder?"Estimated order total "+money(state.total):"No order in cart";
}
function iconStyle(c){return "--logo:"+c.bg+";--logo-text:"+c.fg}
function makeList(){
 const root=$("#payCoinList");root.replaceChildren();
 for(const c of COINS){
  const btn=document.createElement("button");btn.type="button";btn.className="coin-row";
  const logo=document.createElement("span");logo.className="coin-logo";logo.style.cssText=iconStyle(c);logo.textContent=c.mark;
  const desc=document.createElement("span");const name=document.createElement("span"),network=document.createElement("span");name.className="coin-title";name.textContent=c.name;network.className="coin-network";network.textContent=c.network;desc.append(name,network);
  const amount=document.createElement("span");amount.className="coin-conversion";const rate=Number(state.rates[c.id]||0);
  amount.textContent=rate>0&&state.hasOrder?formatCrypto(state.total/rate,c)+" "+c.symbol:rate>0?"View rate":"—";
  const sub=document.createElement("small");sub.textContent=rate>0?"1 "+c.symbol+" ≈ "+money(rate):"Rate unavailable";amount.append(sub);
  const arrow=document.createElement("span");arrow.className="coin-row-arrow";arrow.textContent="›";
  btn.append(logo,desc,amount,arrow);btn.onclick=()=>openInvoice(c);
  root.append(btn);
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
 if(state.expiresAt&&!rest){
  state.expiresAt=0;state.quoted=null;
  $("#invoiceClock").textContent="Expired";
  $("#invoicePaymentStatus").textContent="Quote expired — refresh rate";
  $("#invoiceAmount").textContent="—";$("#walletAmount").value="—";
  $("#copyAmount").disabled=true;$("#copyWalletAmount").disabled=true;
  disableWallet();
 }
}
function disableWallet(){
 $("#walletAddress").value="Not configured";
 $("#copyWallet").disabled=true;$("#qrPlaceholder").hidden=false;$("#qrCode").hidden=true;
 $("#qrCaption").textContent="Wallet not configured. Do not send any funds.";
 $("#invoiceStatus").textContent="Preview";
}
function renderQR(address,amount,c){
 const node=$("#qrCode");node.replaceChildren();node.hidden=false;$("#qrPlaceholder").hidden=true;
 if(typeof QRCode!=="function"){node.hidden=true;$("#qrPlaceholder").hidden=false;$("#qrCaption").textContent="QR generator unavailable. Copy the address manually.";return}
 // Keep the QR payload to the receiving address only; users verify the amount separately.
 try{new QRCode(node,{text:address,width:220,height:220,colorDark:"#082d20",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M});
 $("#qrCaption").textContent="Scan with your "+c.name+" wallet."}
 catch(e){node.hidden=true;$("#qrPlaceholder").hidden=false;$("#qrCaption").textContent="QR unavailable. Copy the wallet address manually."}
}
function invoiceDetails(){
 const c=state.coin,rate=Number(state.rates[c.id]||0);
 $("#invoiceCoinName").textContent=c.name;$("#invoiceSymbol").textContent=c.symbol;
 $("#invoiceNetwork").textContent=c.network;$("#walletAmountCoin").textContent=c.symbol;
 const logo=$("#invoiceCoinLogo");logo.style.cssText=iconStyle(c);logo.textContent=c.mark;
 $("#networkWarningTitle").textContent="Send only "+c.symbol+" on "+c.network;
 const address=WALLETS[c.symbol];
 const valid=Boolean(state.hasOrder&&state.expiresAt>Date.now()&&state.quoted>0&&rate>0);
 const amount=valid?formatCrypto(state.quoted,c):"—";
 $("#invoiceAmount").textContent=amount;$("#walletAmount").value=amount;
 $("#copyAmount").disabled=!valid;$("#copyWalletAmount").disabled=!valid;
 if(address&&valid){
  $("#walletAddress").value=address;$("#copyWallet").disabled=false;
  $("#invoiceStatus").textContent="Wallet configured";
  $("#invoicePaymentStatus").textContent="Manual verification not connected";
  renderQR(address,amount,c);
 }else{
  disableWallet();
  $("#invoicePaymentStatus").textContent=!state.hasOrder?"No order in cart":!valid?"Waiting for current quote":"Wallet setup required";
 }
 $("#invoiceFootnote").textContent="Preview only — shipping/tax amounts and payment confirmation require a secure order backend.";
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
 try{await navigator.clipboard.writeText(text);const previous=button.textContent;button.textContent="✓";setTimeout(()=>button.textContent=previous,1500)}catch(e){button.title="Copy unavailable; select and copy manually"}
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
 const d=await json("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDT,USDC,SOL,LTC,XRP,BNB,XMR&tsyms=USD");
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
 $("#payRateStatus").textContent="Loading current market prices…";$("#retryRates").disabled=true;$("#refreshInvoice").disabled=true;
 const combined={},sources=[];
 // Any rate data must come from a successful live endpoint; do not manufacture rates.
 try{
  const responses=await Promise.allSettled([sourceCoinLore(),sourceCryptoCompare(),sourceCoinGecko()]);
  for(const r of responses){if(r.status!=="fulfilled")continue;sources.push(r.value.name);
   for(const [id,price]of Object.entries(r.value.rates))if(!combined[id]&&Number(price)>0)combined[id]=price;
  }
  state.rates=combined;state.source=sources.join(", ");
  $("#payRateStatus").textContent=sources.length?"Live rates: "+state.source+" · "+new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):"Live rates unavailable. Retry or use a hosted price endpoint.";
  makeList();
  // Explicit refresh creates a new one-hour estimate for the selected currency.
  if(!$("#payInvoice").hidden){
   const rate=Number(state.rates[state.coin.id]||0);
   state.quoted=rate>0&&state.hasOrder?state.total/rate:null;
   state.expiresAt=state.quoted?Date.now()+3600000:0;
   invoiceDetails();
  }
 }finally{state.loading=false;$("#retryRates").disabled=false;$("#refreshInvoice").disabled=false}
}
document.addEventListener("DOMContentLoaded",()=>{
 cartTotals();makeList();disableWallet();
 $("#changeCurrency").onclick=()=>selectScreen("choose");
 $("#retryRates").onclick=loadRates;$("#refreshInvoice").onclick=loadRates;
 $("#copyWallet").onclick=()=>copy($("#walletAddress").value,$("#copyWallet"));
 $("#copyAmount").onclick=()=>copy($("#walletAmount").value,$("#copyAmount"));
 $("#copyWalletAmount").onclick=()=>copy($("#walletAmount").value,$("#copyWalletAmount"));
 state.timer=setInterval(updateClock,1000);
 loadRates();
});
})();