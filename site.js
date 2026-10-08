(() => {
const S=window.STORE||{
  name:"Aspen Labs",shortName:"ASPEN LABS",subName:"",currency:"USD",
  shippingThreshold:250,cartReservationMinutes:10,
  promo:{enabled:false,label:"",endsAt:"",cta:"",href:"collections.html"},
  announcements:["FREE SHIPPING ON ORDERS $250+","KITS-ONLY CATALOG","TRACKED DELIVERY","SUPPORT WHEN YOU NEED IT"]
},P=Array.isArray(window.PRODUCTS)?window.PRODUCTS:[];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:S.currency}).format(n);
const icon=(name)=>({
 menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.4-4.1 4.1-6 8-6s6.6 1.9 8 6"/></svg>',
 bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5h5v5"/></svg>',
 products:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7v10l8 4 8-4V7"/><path d="M12 11v10"/></svg>',
 track:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
 contact:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v12H8l-4 3V5Z"/><path d="m7 8 5 4 5-4"/></svg>',
 account:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.4-4.1 4.1-6 8-6s6.6 1.9 8 6"/></svg>',
 shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.6 2.8 8.6 7 10 4.2-1.4 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
 delivery:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v11H3z"/><path d="M14 9h4l3 4v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
 document:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>'
}[name]||'');
function header(){
 const a=S.announcements.map(x=>'<span>'+x+'</span><i>✦</i>').join('');
 $('#site-top').innerHTML='<div class="promo-stack"><div class="marquee"><div class="marquee-track"><div class="marquee-set">'+a+'</div><div class="marquee-set">'+a+'</div></div></div></div><header class="site-header"><div class="header-left"><button class="header-icon menu-trigger" aria-label="Open menu">'+icon('menu')+'</button></div><a class="brand brand-image" href="index.html"><img src="public/brand/aspen-labs-header.PNG" alt="Aspen Labs"></a><nav class="desktop-nav"><a href="index.html">Home</a><a href="collections.html">Products</a><a href="track-order.html">Track Order</a><a href="contact.html">Contact</a></nav><div class="header-right"><a class="header-icon" href="account.html" aria-label="Account">'+icon('user')+'</a><button class="header-icon cart-trigger" aria-label="Open cart">'+icon('bag')+'<span class="cart-count">0</span></button></div></header><div class="menu-overlay"></div><aside class="menu-drawer premium-menu"><div class="drawer-top premium-menu-top"><a class="menu-brand-lockup menu-brand-image" href="index.html"><img src="public/brand/aspen-labs-header.PNG" alt="Aspen Labs"></a><button class="close-btn menu-close" aria-label="Close menu">×</button></div><nav class="menu-links premium-menu-links"><a href="index.html"><span class="nav-icon">'+icon('home')+'</span><span class="nav-copy"><strong>Home</strong><small>Back to the storefront</small></span><span class="nav-arrow">→</span></a><a href="collections.html"><span class="nav-icon">'+icon('products')+'</span><span class="nav-copy"><strong>Products</strong><small>Browse the kits catalog</small></span><span class="nav-arrow">→</span></a><a href="track-order.html"><span class="nav-icon">'+icon('track')+'</span><span class="nav-copy"><strong>Track Order</strong><small>Check shipping status</small></span><span class="nav-arrow">→</span></a><a href="contact.html"><span class="nav-icon">'+icon('contact')+'</span><span class="nav-copy"><strong>Contact Us</strong><small>Get help from support</small></span><span class="nav-arrow">→</span></a></nav><div class="menu-meta premium-menu-meta account-menu-cta"><div class="account-menu-icon">'+icon('account')+'</div><div class="account-menu-copy"><span class="menu-meta-label">YOUR ACCOUNT</span><strong>Orders, details, and account access.</strong></div><a href="account.html">Open account →</a></div></aside>';
}
function footer(){
 $('#site-bottom').innerHTML='<footer class="footer footer-v2"><div class="footer-main"><div class="footer-brand footer-brand-v2"><a class="footer-logo footer-logo-v2 footer-logo-image" href="index.html"><img src="public/brand/aspen-labs-header.PNG" alt="Aspen Labs"></a><p>A cleaner research storefront built around product clarity, documentation, tracked delivery, and responsive support.</p><div class="footer-badges"><span>✓ Secure checkout</span><span>○ Tracked delivery</span><span>◇ Documentation</span></div></div><div class="footer-links"><div><h4>Shop</h4><a href="collections.html">All kits</a><a href="collections.html?filter=Featured">Featured</a><a href="documentation.html">Documentation</a></div><div><h4>Support</h4><a href="track-order.html">Track order</a><a href="contact.html">Contact us</a><a href="faq.html">FAQ</a><a href="shipping.html">Shipping</a></div><div><h4>Company</h4><a href="about.html">About</a><a href="index.html#standards">Our standards</a><a href="account.html">Account</a></div><div><h4>Legal</h4><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="returns.html">Returns</a><a href="disclaimer.html">Disclaimer</a></div></div></div><div class="footer-bottom footer-bottom-v2"><span>© <span data-year></span> '+S.name+'</span><span>'+S.currency+' · Secure checkout</span></div></footer>';
}
function cartShell(){
 document.body.insertAdjacentHTML('beforeend','<div class="cart-overlay"></div><aside class="cart-drawer premium-cart"><div class="cart-head premium-cart-head"><div class="cart-title-row"><h2>Your Cart</h2><span class="cart-item-pill" data-drawer-pill>0 items</span></div><button class="close-btn cart-close" aria-label="Close cart">×</button></div><div class="cart-reserve" data-reserve-wrap hidden><div><span class="reserve-label">CART RESERVED FOR</span><strong data-reserve-time>10:00</strong></div><small>Your cart session is held for 10 minutes at a time.</small></div><div class="cart-shipping premium-shipping free-shipping-card" data-shipping-wrap><div class="shipping-copy"><span>FREE SHIPPING · $250+</span><strong data-shipping-msg></strong></div><div class="shipping-progress-row"><div class="progress premium-progress"><span data-progress></span></div><span class="shipping-goal-icon" data-shipping-icon aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v11H3z"/><path d="M14 9h4l3 4v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg></span></div></div><div class="cart-items premium-items" data-cart-items></div><div class="cart-foot premium-cart-foot"><div class="cart-summary-row"><span>Subtotal</span><strong data-subtotal>$0.00</strong></div><div class="cart-summary-row shipping-row"><span>Shipping</span><span>Calculated at checkout</span></div><a class="checkout-btn premium-checkout" href="checkout.html"><span>Checkout</span><span>→</span></a><a class="view-cart-link" href="cart.html">View Full Cart</a></div></aside>');
}
const CART_KEY='aspen-labs-cart-v2';
const CART_BACKUP_KEY='aspen-labs-cart-backup-v1';
function readStoredCart(){
  const candidates=[localStorage.getItem(CART_KEY),localStorage.getItem(CART_BACKUP_KEY),localStorage.getItem('forma-cart-v2'),localStorage.getItem('cart')];
  for(const raw of candidates){
    if(!raw)continue;
    try{const parsed=JSON.parse(raw);if(Array.isArray(parsed)&&parsed.length)return parsed}catch(e){}
  }
  return [];
}
let cart=readStoredCart();
cart=Array.isArray(cart)?cart.map(l=>{const p=P.find(x=>x.slug===l.slug);return p?{slug:l.slug,variant:l.variant||defaultVariant(p).label,qty:Math.max(1,Number(l.qty)||1)}:null}).filter(Boolean):[];
try{
 const payload=JSON.stringify(cart);
 localStorage.setItem(CART_KEY,payload);
 localStorage.setItem(CART_BACKUP_KEY,payload);
}catch(e){}
const RESERVE_KEY='aspen-labs-cart-reservation-deadline';
let reservationTimer=null;
function reservationMs(){return (S.cartReservationMinutes||10)*60*1000}
function ensureReservation(){
 if(!cart.length){localStorage.removeItem(RESERVE_KEY);return null}
 let deadline=Number(localStorage.getItem(RESERVE_KEY)||0);
 if(!deadline||deadline<=Date.now()){deadline=Date.now()+reservationMs();localStorage.setItem(RESERVE_KEY,String(deadline))}
 return deadline;
}
function reservationRemaining(){
 const deadline=ensureReservation();return deadline?Math.max(0,deadline-Date.now()):0;
}
function formatReservation(ms){
 const total=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(total/60),s=total%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}
function tickReservation(){
 if(!cart.length){$$('[data-reserve-wrap]').forEach(e=>e.hidden=true);return}
 let deadline=Number(localStorage.getItem(RESERVE_KEY)||0);
 if(!deadline||deadline<=Date.now()){deadline=Date.now()+reservationMs();localStorage.setItem(RESERVE_KEY,String(deadline))}
 const text=formatReservation(deadline-Date.now());
 $$('[data-reserve-time]').forEach(e=>e.textContent=text);
 $$('[data-reserve-wrap]').forEach(e=>e.hidden=false);
}
function startReservationTimer(){ensureReservation();tickReservation();if(reservationTimer)clearInterval(reservationTimer);reservationTimer=setInterval(tickReservation,1000)}
function saveCart(){
 const payload=JSON.stringify(cart);
 localStorage.setItem(CART_KEY,payload);
 localStorage.setItem(CART_BACKUP_KEY,payload);
 ensureReservation();renderCart();renderCheckout&&renderCheckout();renderFullCart();tickReservation();
}
function productBySlug(slug){if(slug==="etatrutide")slug="retatrutide";return P.find(p=>p.slug===slug)}
function productVariants(p){return Array.isArray(p?.variants)&&p.variants.length?[...p.variants].sort((a,b)=>(a.amount??0)-(b.amount??0)):[{label:"Default",amount:0,price:p?.price??null,compareAt:p?.compareAt||null}]}
function defaultVariant(p){return productVariants(p)[0]}
function variantFor(p,label){const variants=productVariants(p);return variants.find(v=>v.label===label)||variants[0]}
function lineVariant(l){const p=productBySlug(l.slug);return p?variantFor(p,l.variant):null}
function lineUnitPrice(l){const v=lineVariant(l);return v&&Number.isFinite(Number(v.price))?Number(v.price):0}
function lineKey(slug,variant){return slug+"||"+(variant||"")}
function cartCount(){return cart.reduce((n,l)=>n+l.qty,0)}
function cartSubtotal(){return cart.reduce((n,l)=>n+lineUnitPrice(l)*l.qty,0)}
function renderCart(){
 const count=cartCount(), subtotal=cartSubtotal();
 $$('.cart-count').forEach(e=>e.textContent=count);
 const dc=$('[data-drawer-count]');if(dc)dc.textContent='('+count+')';
 const pill=$('[data-drawer-pill]');if(pill)pill.textContent=count+' '+(count===1?'item':'items');
 const sub=$('[data-subtotal]');if(sub)sub.textContent=money(subtotal);
 const progress=$('[data-progress]');if(progress)progress.style.width=Math.min(100,subtotal/S.shippingThreshold*100)+'%';
 const unlocked=subtotal>=S.shippingThreshold;
 const ship=$('[data-shipping-msg]');if(ship)ship.textContent=unlocked?'Free shipping unlocked':'Add '+money(S.shippingThreshold-subtotal)+' more';
 const shippingWrap=$('[data-shipping-wrap]');if(shippingWrap){shippingWrap.hidden=!count;shippingWrap.classList.toggle('shipping-unlocked',unlocked)}
 const shipIcon=$('[data-shipping-icon]');if(shipIcon)shipIcon.classList.toggle('complete',unlocked);
 const items=$('[data-cart-items]');
 if(items)items.innerHTML=cart.length?cart.map(l=>{const p=productBySlug(l.slug);if(!p)return'';const v=lineVariant(l),unit=lineUnitPrice(l),variant=v?.label||'Default';return '<div class="cart-line premium-line"><img src="'+p.image+'" alt="'+p.name+'"><div class="cart-line-main"><small>'+p.category.toUpperCase()+'</small><h4>'+p.name+'</h4><span class="cart-variant">'+variant+'</span><div class="cart-line-controls"><div class="qty premium-qty"><button data-dec-slug="'+p.slug+'" data-dec-variant="'+variant+'" aria-label="Decrease quantity">−</button><span>'+l.qty+'</span><button data-inc-slug="'+p.slug+'" data-inc-variant="'+variant+'" aria-label="Increase quantity">+</button></div><button class="remove premium-remove" data-remove-slug="'+p.slug+'" data-remove-variant="'+variant+'">Remove</button></div></div><strong class="line-total">'+money(unit*l.qty)+'</strong></div>'}).join(''):'<div class="empty-cart premium-empty"><div class="empty-icon">◇</div><h3>Your cart is empty.</h3><p>Browse the collection and add a product to begin your cart session.</p><a class="button" href="collections.html">Shop products →</a></div>';
 $$('[data-inc-slug]').forEach(b=>b.onclick=()=>changeQty(b.dataset.incSlug,b.dataset.incVariant,1));
 $$('[data-dec-slug]').forEach(b=>b.onclick=()=>changeQty(b.dataset.decSlug,b.dataset.decVariant,-1));
 $$('[data-remove-slug]').forEach(b=>b.onclick=()=>removeFromCart(b.dataset.removeSlug,b.dataset.removeVariant));
 tickReservation();
}
function addToCart(slug,qty=1,variantLabel=null,openDrawer=true){
 const p=productBySlug(slug);if(!p)return;
 const v=variantFor(p,variantLabel);
 const line=cart.find(l=>l.slug===slug&&(l.variant||defaultVariant(p).label)===v.label);
 if(line){line.variant=v.label;line.qty+=qty}else cart.push({slug,variant:v.label,qty});
 saveCart();if(openDrawer)openCart();
}
function changeQty(slug,variantLabel,d){
 const p=productBySlug(slug);if(!p)return;const v=variantFor(p,variantLabel);
 const l=cart.find(x=>x.slug===slug&&(x.variant||defaultVariant(p).label)===v.label);if(!l)return;
 l.variant=v.label;l.qty+=d;if(l.qty<=0)cart=cart.filter(x=>x!==l);saveCart();
}
function removeFromCart(slug,variantLabel){
 const p=productBySlug(slug);if(!p)return;const v=variantFor(p,variantLabel);
 cart=cart.filter(x=>!(x.slug===slug&&(x.variant||defaultVariant(p).label)===v.label));saveCart();
}
function openMenu(){$('.menu-drawer').classList.add('open');$('.menu-overlay').classList.add('show');document.body.classList.add('lock')}
function closeMenu(){$('.menu-drawer').classList.remove('open');$('.menu-overlay').classList.remove('show');document.body.classList.remove('lock')}
function openCart(){$('.cart-drawer').classList.add('open');$('.cart-overlay').classList.add('show');document.body.classList.add('lock')}
function closeCart(){$('.cart-drawer').classList.remove('open');$('.cart-overlay').classList.remove('show');document.body.classList.remove('lock')}
function countdown(){}
function productCard(p){
 const variants=productVariants(p),v=variants[0],hasPrice=Number.isFinite(Number(v.price))&&v.price!==null,hasMultiple=variants.length>1,hasSale=hasPrice&&Number(v.compareAt)>Number(v.price),save=hasSale?Math.round((1-Number(v.price)/Number(v.compareAt))*100):0;
 const priceHtml=hasPrice?'<strong>'+(hasMultiple?'From ':'')+money(v.price)+'</strong>'+(hasSale?'<s>'+money(v.compareAt)+'</s>':''):'<strong>Pricing coming soon</strong>';
 return '<article class="product-card" data-cat="'+p.category.toLowerCase()+'" data-name="'+p.name.toLowerCase()+'">'+(p.badge?'<span class="product-badge">'+p.badge+'</span>':'')+(hasSale?'<span class="card-save-badge">Save '+save+'%</span>':'')+'<a class="product-image" href="product.html?slug='+p.slug+'"><img src="'+p.image+'" alt="'+p.name+'"></a><div class="product-body"><div class="product-card-topline"><span class="product-meta">'+p.category+'</span><span class="variant-count">'+variants.length+' '+(variants.length===1?'size':'sizes')+'</span></div><h3><a href="product.html?slug='+p.slug+'">'+p.name+'</a></h3><div class="product-price">'+priceHtml+'</div><a class="product-options-btn" href="product.html?slug='+p.slug+'"><span>View options</span><span>→</span></a></div></article>'
}
function bindAdds(root=document){$$('[data-add]',root).forEach(b=>b.onclick=()=>addToCart(b.dataset.add))}
function renderGrid(sel,items=P){const el=$(sel);if(!el)return;el.innerHTML=items.map(productCard).join('');bindAdds(el)}
function renderProduct(){
 const root=$('#product-page');if(!root)return;
 if(!P.length){root.innerHTML='<div class="notice">Product data is temporarily unavailable. Please refresh the page.</div>';return}
 const slug=new URLSearchParams(location.search).get('slug')||P[0].slug,p=productBySlug(slug)||P[0];
 const variants=productVariants(p),gallery=(Array.isArray(p.gallery)&&p.gallery.length?p.gallery:[p.image]),first=variants[0];
 let selected=first,q=1,currentSlide=0;
 document.title=p.name+' — '+S.name;
 const shippingCutoff=(S.sameDayShipping&&S.sameDayShipping.cutoff)||'2 PM';
 const guaranteeDays=S.moneyBackDays||30;
 root.innerHTML='<div class="product-breadcrumb"><a href="index.html">Home</a><span>›</span><a href="collections.html">Products</a><span>›</span><strong>'+p.name+'</strong></div>'+
 '<div class="product-layout product-layout-v2">'+
  '<div class="product-gallery">'+
   '<div class="gallery-shell"><span class="product-sale-pill" id="productSalePill" hidden>SALE</span><button class="gallery-arrow gallery-prev" type="button" aria-label="Previous image">←</button><div class="product-gallery-track" id="galleryTrack">'+gallery.map((img,i)=>'<figure class="product-slide" data-slide="'+i+'"><img src="'+img+'" alt="'+p.name+' image '+(i+1)+'"></figure>').join('')+'</div><button class="gallery-arrow gallery-next" type="button" aria-label="Next image">→</button><div class="gallery-dots">'+gallery.map((_,i)=>'<button type="button" class="gallery-dot '+(i===0?'active':'')+'" data-dot="'+i+'" aria-label="Go to image '+(i+1)+'"></button>').join('')+'</div></div>'+
   '<div class="product-gallery-trust"><div><span class="benefit-icon">'+icon('shield')+'</span><strong>99%+ purity</strong><small>Verified by batch testing</small></div><div><span class="benefit-icon">'+icon('document')+'</span><strong>COA included</strong><small>Batch documentation included</small></div><div><span class="benefit-icon">'+icon('delivery')+'</span><strong>U.S. shipped</strong><small>Ships from U.S. fulfillment</small></div></div>'+
  '</div>'+
  '<div class="product-info product-info-v2">'+
   '<p class="eyebrow">'+p.category+'</p><h1>'+p.name+'</h1>'+

   '<div class="product-price-row"><div class="product-main-price" id="productPrice"><strong>'+((first.price!==null&&Number.isFinite(Number(first.price)))?money(first.price):'Pricing coming soon')+'</strong>'+(first.compareAt&&first.price!==null?'<s>'+money(first.compareAt)+'</s>':'')+'</div><span class="save-badge" id="saveBadge" hidden></span></div>'+
   '<p class="product-sub product-description">'+p.description+'</p>'+
   '<div class="purchase-box" id="purchaseBox">'+
    '<label class="option-label" for="variantSelect">Choose size</label><div class="variant-select-wrap"><select id="variantSelect" class="variant-select">'+variants.map((v,i)=>'<option value="'+v.label+'" '+(i===0?'selected':'')+'>'+v.label+((v.price!==null&&Number.isFinite(Number(v.price)))?' — '+money(v.price):'')+'</option>').join('')+'</select><span class="variant-chevron">⌄</span></div>'+
    '<span id="selectedVariantLabel" class="selected-variant-hidden">'+first.label+'</span>'+
    '<label class="option-label">Quantity</label><div class="qty-box qty-box-v3"><button id="prodDec" type="button" aria-label="Decrease quantity">−</button><span id="prodQty">1</span><button id="prodInc" type="button" aria-label="Increase quantity">+</button></div>'+
    '<div class="purchase-actions"><button class="product-add" id="prodAdd" type="button">Add to cart</button><button class="buy-now coa-button" id="viewCoa" type="button">View COA</button></div>'+
    '<div class="purchase-quick-trust">'+
      '<div><span class="quick-trust-icon">'+icon('delivery')+'</span><strong>U.S. delivery</strong><small>3–5 business days</small></div>'+
      '<div><span class="quick-trust-icon">'+icon('shield')+'</span><strong>Secure checkout</strong><small>Protected payment flow</small></div>'+
      '<div><span class="quick-trust-icon">'+icon('track')+'</span><strong>Ships from Florida</strong><small>Tracked fulfillment</small></div>'+
    '</div>'+
    '<div class="purchase-benefits">'+
      '<div class="purchase-benefit"><span class="purchase-benefit-icon">'+icon('delivery')+'</span><div><strong>Same-day shipping</strong><small>Eligible orders placed before '+shippingCutoff+' are prepared for same-day shipment.</small></div></div>'+
      '<div class="purchase-benefit"><span class="purchase-benefit-icon">'+icon('shield')+'</span><div><strong>'+guaranteeDays+'-day money-back guarantee</strong><small>Eligible orders are covered under the store refund policy.</small></div></div>'+
    '</div>'+
   '</div>'+
   '<div class="product-accordions premium-product-accordions">'+
    '<details class="product-detail-panel" name="product-detail"><summary><span>Product information</span><span class="detail-toggle">+</span></summary><div class="detail-body"><div class="spec-table spec-table-v2">'+p.specs.map(x=>'<div class="spec-row"><span>'+x[0]+'</span><strong>'+x[1]+'</strong></div>').join('')+'</div></div></details>'+
    '<details class="product-detail-panel" name="product-detail"><summary><span>Shipping & support</span><span class="detail-toggle">+</span></summary><div class="detail-body"><div class="shipping-details-list"><div class="shipping-detail-row"><span>U.S. standard shipping</span><strong>3–5 business days</strong></div><div class="shipping-detail-row"><span>U.S. priority shipping</span><strong>1–3 business days</strong></div><div class="shipping-detail-row"><span>Worldwide shipping</span><strong>6–8 business days</strong></div></div><p class="shipping-detail-note">Estimated transit times may vary by destination or carrier.</p></div></details>'+
   '</div>'+
  '</div>'+
 '</div>'+
 '<section class="why-brand-section">'+
  '<div class="why-brand-head"><p class="eyebrow">WHY ASPEN LABS</p><h2>Why customers choose Aspen Labs.</h2><p>Clear product information, straightforward fulfillment, and a simpler buying experience from cart to delivery.</p></div>'+
  '<div class="why-brand-grid">'+
   '<article><span class="why-icon">'+icon('delivery')+'</span><div><strong>Ships from Florida</strong><small>Domestic fulfillment with tracked shipping options.</small></div></article>'+
   '<article><span class="why-icon">'+icon('products')+'</span><div><strong>Free shipping $250+</strong><small>Qualifying orders unlock free shipping automatically.</small></div></article>'+
   '<article><span class="why-icon">'+icon('document')+'</span><div><strong>Batch documentation</strong><small>Product documentation is kept alongside the catalog.</small></div></article>'+
   '<article><span class="why-icon">'+icon('track')+'</span><div><strong>Same-day fulfillment</strong><small>Eligible orders placed before 2 PM are prepared the same day.</small></div></article>'+
   '<article><span class="why-icon">'+icon('shield')+'</span><div><strong>30-day guarantee</strong><small>Eligible orders are covered under the store refund policy.</small></div></article>'+
   '<article><span class="why-icon">'+icon('contact')+'</span><div><strong>Responsive support</strong><small>Help with orders, shipping, and product information.</small></div></article>'+
  '</div>'+
 '</section>'+
 '<div class="sticky-atc premium-sticky-atc product-sticky-v2" id="stickyAtc"><div class="sticky-reserve" data-reserve-wrap hidden><span>Cart reserved</span><strong data-reserve-time>10:00</strong></div><div class="sticky-product"><img src="'+p.image+'" alt=""><div class="sticky-info"><strong>'+p.name+'</strong><small><span id="stickyVariant">'+first.label+'</span> · <span id="stickyPrice">'+money(first.price)+'</span></small></div><div class="sticky-qty"><button id="stickyDec" type="button">−</button><span id="stickyQty">1</span><button id="stickyInc" type="button">+</button></div><button id="stickyAdd" class="sticky-add-btn" type="button">Add to cart</button></div></div>';

 const qEl=$('#prodQty'),sq=$('#stickyQty'),priceEl=$('#productPrice'),variantLabel=$('#selectedVariantLabel'),stickyVariant=$('#stickyVariant'),stickyPrice=$('#stickyPrice'),select=$('#variantSelect'),saveBadge=$('#saveBadge'),salePill=$('#productSalePill');
 const syncQty=()=>{qEl.textContent=q;if(sq)sq.textContent=q};
 const syncVariant=()=>{
   const hasPrice=selected.price!==null&&Number.isFinite(Number(selected.price)),compare=Number(selected.compareAt||0),price=hasPrice?Number(selected.price):null,hasSale=hasPrice&&compare>price;
   const savings=hasSale?Math.round((1-price/compare)*100):0;
   priceEl.innerHTML='<strong>'+(hasPrice?money(price):'Pricing coming soon')+'</strong>'+(hasSale?'<s>'+money(compare)+'</s>':'');
   if(saveBadge){saveBadge.hidden=!hasSale;saveBadge.textContent=hasSale?'Save '+savings+'%':''}
   if(salePill)salePill.hidden=!hasSale;
   variantLabel.textContent=selected.label;
   if(stickyVariant)stickyVariant.textContent=selected.label;
   if(stickyPrice)stickyPrice.textContent=hasPrice?money(price):'Pricing coming soon';
   const addBtn=$('#prodAdd'),stickyBtn=$('#stickyAdd');
   if(addBtn){addBtn.disabled=!hasPrice;addBtn.textContent=hasPrice?'Add to cart':'Pricing coming soon'}
   if(stickyBtn){stickyBtn.disabled=!hasPrice;stickyBtn.textContent=hasPrice?'Add to cart':'Pricing coming soon'}
 };
 syncVariant();
 select.onchange=()=>{selected=variantFor(p,select.value);syncVariant();if(p.slug==='hgh-kit'){const idx=variants.findIndex(v=>v.label===selected.label);if(idx>=0)goTo(idx)}};
 $('#prodInc').onclick=()=>{q++;syncQty()};$('#prodDec').onclick=()=>{q=Math.max(1,q-1);syncQty()};
 if($('#stickyInc'))$('#stickyInc').onclick=()=>{q++;syncQty()};if($('#stickyDec'))$('#stickyDec').onclick=()=>{q=Math.max(1,q-1);syncQty()};
 $('#prodAdd').onclick=()=>{if(selected.price!==null&&Number.isFinite(Number(selected.price)))addToCart(p.slug,q,selected.label,true)};
 $('#stickyAdd').onclick=()=>{if(selected.price!==null&&Number.isFinite(Number(selected.price)))addToCart(p.slug,q,selected.label,true)};

 const detailEls=$('.product-accordions details');
 detailEls.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)detailEls.forEach(o=>{if(o!==d)o.open=false})}));
 const viewCoa=$('#viewCoa');
 if(viewCoa)viewCoa.onclick=()=>{location.href='documentation.html'};

 const track=$('#galleryTrack'),slides=$$('.product-slide',track),dots=$$('.gallery-dot');
 const goTo=i=>{currentSlide=(i+gallery.length)%gallery.length;slides[currentSlide].scrollIntoView({behavior:'smooth',inline:'start',block:'nearest'});dots.forEach((d,n)=>d.classList.toggle('active',n===currentSlide))};
 const prev=$('.gallery-prev'),next=$('.gallery-next');
 if(prev)prev.onclick=()=>goTo(currentSlide-1);if(next)next.onclick=()=>goTo(currentSlide+1);dots.forEach(d=>d.onclick=()=>goTo(Number(d.dataset.dot)));
 let scrollTick=null;track.addEventListener('scroll',()=>{clearTimeout(scrollTick);scrollTick=setTimeout(()=>{const w=track.clientWidth||1;currentSlide=Math.round(track.scrollLeft/w);dots.forEach((d,n)=>d.classList.toggle('active',n===currentSlide))},80)},{passive:true});

 const atc=$('#stickyAtc'),purchase=$('#purchaseBox');
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{const e=entries[0];if(e.isIntersecting){atc.classList.remove('show')}else{atc.classList.toggle('show',e.boundingClientRect.top<0)}},{threshold:.08});
  observer.observe(purchase);
 }else{
  window.addEventListener('scroll',()=>{const r=purchase.getBoundingClientRect();atc.classList.toggle('show',r.bottom<0)},{passive:true});
 }
}

function initCatalog(){
 const grid=$('#catalog-grid'),search=$('#catalogSearch');if(!grid)return;let active=(new URLSearchParams(location.search).get('filter')||'all').toLowerCase();const apply=()=>{const q=(search?.value||'').toLowerCase();const items=P.filter(p=>(active==='all'||p.category.toLowerCase()===active)&&(!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));renderGrid('#catalog-grid',items);const n=$('#catalogCount');if(n)n.textContent=items.length+' products'};renderGrid('#catalog-grid');search&&search.addEventListener('input',apply);$$('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter.toLowerCase()===active);b.onclick=()=>{active=b.dataset.filter.toLowerCase();$$('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));apply()}});apply()
}
function initTracking(){
 const form=$('#trackForm'),result=$('#trackResult'),demo=$('#demoTrack');if(!form)return;form.onsubmit=e=>{e.preventDefault();$('#trackStatus').textContent='Live order lookup is not connected yet. Use the demo below to preview the finished experience.'};demo.onclick=()=>{result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'start'})}
}
function initContact(){const f=$('#contactForm');if(f)f.onsubmit=e=>{e.preventDefault();$('#contactStatus').textContent='The support form design is ready. Email delivery will be connected before launch.'}}
function initAccount(){const f=$('#loginForm');if(f)f.onsubmit=e=>{e.preventDefault();$('#loginStatus').textContent='Account authentication will be connected before launch.'}}
function selectedShippingMethod(){
 const checked=$('.checkout-method input[name="ship"]:checked');
 return checked?checked.value:'standard';
}
function shippingCostFor(method,subtotal){
 if(method==='free'&&subtotal>=S.shippingThreshold)return 0;
 if(method==='priority')return 14.99;
 return 4.99;
}
function syncCheckoutShippingOptions(){
 const subtotal=cartSubtotal(),qualifies=subtotal>=S.shippingThreshold;
 const standard=$('[data-ship-method="standard"]'),free=$('[data-ship-method="free"]');
 if(standard){standard.hidden=qualifies;standard.style.display=qualifies?'none':'flex';standard.querySelector('input').disabled=qualifies}
 if(free){free.hidden=!qualifies;free.style.display=qualifies?'flex':'none';free.querySelector('input').disabled=!qualifies}
 const allowed=qualifies?['free','priority']:['standard','priority'];
 const saved=localStorage.getItem('aspen-checkout-shipping-method');
 const current=$('.checkout-method input[name="ship"]:checked')?.value;
 const chosen=allowed.includes(current)&&current===saved?current:(allowed.includes(saved)?saved:allowed[0]);
 const effective=allowed.includes(chosen)?chosen:allowed[0];
 $$('.checkout-method input[name="ship"]').forEach(r=>{
   r.checked=r.value===effective;
   r.closest('.checkout-method')?.classList.toggle('selected',r.checked);
 });
 localStorage.setItem('aspen-checkout-shipping-method',effective);
}
function renderCheckout(){
 const root=$('#checkout-summary');if(!root)return;
 syncCheckoutShippingOptions();
 const subtotal=cartSubtotal(),method=selectedShippingMethod(),shipping=shippingCostFor(method,subtotal);
 const lines=cart.length?cart.map(l=>{
   const p=productBySlug(l.slug);if(!p)return'';
   const v=lineVariant(l),unit=lineUnitPrice(l);
   const idx=productVariants(p).findIndex(x=>x.label===v.label);
   const image=p.slug==='hgh-kit'&&idx>=0&&p.gallery?.[idx]?p.gallery[idx]:p.image;
   return '<div class="summary-line checkout-product-line"><img class="checkout-product-image" src="'+image+'" alt=""><span class="checkout-product-details"><strong>'+p.name+'</strong><small>'+v.label+'</small><small>Qty '+l.qty+' · '+money(unit)+' each</small></span><strong>'+money(unit*l.qty)+'</strong></div>';
 }).join(''):'<div class="summary-line"><span>Your cart is empty</span><span>—</span></div>';
 root.innerHTML=lines+'<div class="summary-line"><span>Subtotal</span><strong>'+money(subtotal)+'</strong></div><div class="summary-line"><span>Shipping · '+(method==='priority'?'Priority':shipping===0?'Free tracked':'Standard')+'</span><strong>'+(shipping===0?'Free':money(shipping))+'</strong></div><div class="summary-line total"><strong>Estimated total</strong><strong>'+money(subtotal+shipping)+'</strong></div>';
}
function renderFullCart(){
 const root=$('#fullCart');if(!root)return;
 const subtotal=cartSubtotal(),count=cartCount();
 root.innerHTML='<div class="full-cart-layout"><div><div class="full-cart-reserve" data-reserve-wrap '+(count?'':'hidden')+'><div><span>CART RESERVED FOR</span><strong data-reserve-time>'+formatReservation(reservationRemaining())+'</strong></div><small>Your cart session refreshes every 10 minutes while items remain.</small></div><div class="full-cart-items">'+(cart.length?cart.map(l=>{const p=productBySlug(l.slug);if(!p)return'';const v=lineVariant(l),unit=lineUnitPrice(l);return '<article class="full-cart-line"><img src="'+p.image+'" alt="'+p.name+'"><div><small>'+p.category.toUpperCase()+'</small><h3>'+p.name+'</h3><p>'+v.label+' · '+money(unit)+' each</p><div class="qty premium-qty"><button data-fdec-slug="'+p.slug+'" data-fdec-variant="'+v.label+'">−</button><span>'+l.qty+'</span><button data-finc-slug="'+p.slug+'" data-finc-variant="'+v.label+'">+</button></div><button class="remove premium-remove" data-fremove-slug="'+p.slug+'" data-fremove-variant="'+v.label+'">Remove</button></div><strong>'+money(unit*l.qty)+'</strong></article>'}).join(''):'<div class="empty-cart premium-empty"><h3>Your cart is empty.</h3><p>Add a product to start your 10-minute cart reservation session.</p><a class="button" href="collections.html">Shop products →</a></div>')+'</div></div><aside class="full-cart-summary"><p class="eyebrow">ORDER SUMMARY</p><div class="cart-summary-row"><span>Subtotal</span><strong>'+money(subtotal)+'</strong></div><div class="cart-summary-row shipping-row"><span>Shipping</span><span>Calculated at checkout</span></div><div class="premium-shipping full-cart-shipping free-shipping-card '+(subtotal>=S.shippingThreshold?'shipping-unlocked':'')+'" '+(count?'':'hidden')+'><div class="shipping-copy"><span>FREE SHIPPING · $250+</span><strong>'+(subtotal>=S.shippingThreshold?'Free shipping unlocked':'Add '+money(S.shippingThreshold-subtotal)+' more')+'</strong></div><div class="shipping-progress-row"><div class="progress premium-progress"><span style="width:'+Math.min(100,subtotal/S.shippingThreshold*100)+'%"></span></div><span class="shipping-goal-icon '+(subtotal>=S.shippingThreshold?'complete':'')+'" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v11H3z"/><path d="M14 9h4l3 4v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg></span></div></div><a class="checkout-btn premium-checkout" href="checkout.html"><span>Checkout</span><span>→</span></a><a class="view-cart-link" href="collections.html">Continue shopping</a></aside></div>';
 $$('[data-finc-slug]').forEach(b=>b.onclick=()=>changeQty(b.dataset.fincSlug,b.dataset.fincVariant,1));
 $$('[data-fdec-slug]').forEach(b=>b.onclick=()=>changeQty(b.dataset.fdecSlug,b.dataset.fdecVariant,-1));
 $$('[data-fremove-slug]').forEach(b=>b.onclick=()=>removeFromCart(b.dataset.fremoveSlug,b.dataset.fremoveVariant));
 tickReservation();
}
const CHECKOUT_DATA_KEY='aspen-labs-checkout-data-v1';
function readCheckoutData(){
 try{return JSON.parse(localStorage.getItem(CHECKOUT_DATA_KEY)||'{}')||{}}catch(e){return{}}
}
function saveCheckoutData(form){
 if(!form)return;
 const data={};
 $$('input,select,textarea',form).forEach(el=>{
   if(!el.name&& !el.matches('.checkout-consent input'))return;
   const key=el.name||'termsAccepted';
   if(el.type==='radio'){if(el.checked)data[key]=el.value;return}
   if(el.type==='checkbox'){data[key]=!!el.checked;return}
   data[key]=el.value;
 });
 localStorage.setItem(CHECKOUT_DATA_KEY,JSON.stringify(data));
}
function restoreCheckoutData(form){
 if(!form)return;
 const data=readCheckoutData();
 $$('input,select,textarea',form).forEach(el=>{
   const key=el.name|| (el.matches('.checkout-consent input')?'termsAccepted':'');
   if(!key||!(key in data))return;
   if(el.type==='radio'){el.checked=String(data[key])===String(el.value);return}
   if(el.type==='checkbox'){el.checked=!!data[key];return}
   el.value=data[key]??'';
 });
}
function initCheckout(){
 const f=$('#checkoutForm');if(!f){renderCheckout();return}
 if(!cart.length){location.replace('cart.html');return}
 const country=$('#country');
 if(country){
   const codes=["US","CA","MX","GB","IE","FR","DE","ES","PT","IT","NL","BE","LU","CH","AT","DK","SE","NO","FI","IS","PL","CZ","SK","HU","RO","BG","GR","HR","SI","RS","BA","ME","MK","AL","EE","LV","LT","UA","MD","BY","RU","TR","CY","MT","AD","MC","SM","VA","LI","AU","NZ","JP","KR","CN","HK","MO","TW","SG","MY","TH","VN","PH","ID","BN","KH","LA","MM","IN","PK","BD","LK","NP","BT","MV","AF","KZ","UZ","TM","KG","TJ","MN","AE","SA","QA","KW","BH","OM","IL","JO","LB","SY","IQ","IR","YE","GE","AM","AZ","ZA","EG","MA","DZ","TN","LY","SD","SS","ET","ER","DJ","SO","KE","UG","TZ","RW","BI","CD","CG","GA","GQ","CM","CF","TD","NG","NE","ML","BF","SN","GM","GW","GN","SL","LR","CI","GH","TG","BJ","MR","CV","ST","AO","ZM","ZW","BW","NA","SZ","LS","MZ","MW","MG","MU","SC","KM","BR","AR","CL","PE","BO","PY","UY","CO","VE","EC","GY","SR","GF","PA","CR","NI","HN","SV","GT","BZ","CU","DO","HT","JM","TT","BB","BS","GD","LC","VC","AG","DM","KN","PR","VI","BM","GL","FO","AI","AW","CW","SX","BQ","KY","TC","VG","MS","FK","GI","JE","GG","IM","AX","SJ","PM","PF","NC","WF","FJ","PG","SB","VU","WS","TO","KI","TV","NR","PW","FM","MH","CK","NU","TK","GU","MP","AS","UM","CC","CX","NF","HM","TF","AQ","BV","SH","IO","PS","EH"];
   let display=null;try{display=new Intl.DisplayNames([navigator.language||'en'],{type:'region'})}catch(e){}
   const options=codes.map(code=>({code,name:display?display.of(code):code})).filter(x=>x.name).sort((a,b)=>a.name.localeCompare(b.name));
   country.insertAdjacentHTML('beforeend',options.map(x=>'<option value="'+x.code+'">'+x.name+'</option>').join(''));
 }
 restoreCheckoutData(f);
 const cryptoRadio=$('.checkout-method input[name="payment"][value="crypto"]');if(cryptoRadio){cryptoRadio.checked=true;cryptoRadio.closest('.checkout-method')?.classList.add('selected')}
 syncCheckoutShippingOptions();
 $('input,select,textarea',f).forEach(el=>el.addEventListener('input',()=>saveCheckoutData(f)));
 $$('input,select,textarea',f).forEach(el=>el.addEventListener('change',()=>saveCheckoutData(f)));
 $$('.checkout-method input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{
   const name=input.name;
   $$('.checkout-method input[name="'+name+'"]').forEach(r=>r.closest('.checkout-method').classList.toggle('selected',r.checked));
   if(name==='ship'&&input.checked){localStorage.setItem('aspen-checkout-shipping-method',input.value);saveCheckoutData(f);renderCheckout();}
 }));
 const savedShip=localStorage.getItem('aspen-checkout-shipping-method');
 if(savedShip){
   const saved=$('.checkout-method input[name="ship"][value="'+savedShip+'"]');
   if(saved&&!saved.disabled){saved.checked=true;saved.dispatchEvent(new Event('change',{bubbles:true}))}
 }
 $$('.checkout-method').forEach(card=>card.addEventListener('click',e=>{
   if(e.target.closest('a,button'))return;
   const input=card.querySelector('input[type="radio"]');
   if(!input||input.disabled)return;
   input.checked=true;
   input.dispatchEvent(new Event('change',{bubbles:true}));
 }));
 const showCheckoutError=(field,message)=>{
   const status=$('#checkoutStatus');
   status.textContent=message;
   status.classList.add('error');
   $$('.checkout-field-error').forEach(el=>el.classList.remove('checkout-field-error'));
   if(field){
     field.classList.add('checkout-field-error');
     const card=field.closest('.checkout-card');
     if(card)card.scrollIntoView({behavior:'smooth',block:'center'});
   }else{
     status.scrollIntoView({behavior:'smooth',block:'center'});
   }
 };
 const requiredFields=$$('[required]',f);
 requiredFields.forEach(el=>{
   el.addEventListener('input',()=>el.classList.remove('checkout-field-error'));
   el.addEventListener('change',()=>el.classList.remove('checkout-field-error'));
 });
 f.onsubmit=e=>{
   e.preventDefault();
   const status=$('#checkoutStatus');
   status.classList.remove('error');
   if(!cart.length){showCheckoutError(null,'Your cart is empty. Add a product before continuing to payment.');return}
   const firstInvalid=requiredFields.find(el=>{
     if(el.type==='checkbox')return !el.checked;
     if(el.type==='email')return !el.value.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
     return !String(el.value||'').trim();
   });
   if(firstInvalid){
     const label=firstInvalid.closest('.field')?.querySelector('label')?.textContent?.trim()||
       (firstInvalid.type==='checkbox'?'Terms agreement':'required field');
     showCheckoutError(firstInvalid,'Please complete '+label.replace(/Optional/gi,'').trim()+' before continuing.');
     return;
   }
   saveCheckoutData(f);
   status.textContent='Opening payment…';
   location.assign('crypto-payment.html');
 };
 renderCheckout();
}
function bindGlobal(){
 $('.menu-trigger').onclick=openMenu;$('.menu-close').onclick=closeMenu;$('.menu-overlay').onclick=closeMenu;$$('.cart-trigger').forEach(b=>b.onclick=openCart);$('.cart-close').onclick=closeCart;$('.cart-overlay').onclick=closeCart;$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());renderCart();startReservationTimer()
}
document.addEventListener('DOMContentLoaded',()=>{header();footer();cartShell();bindGlobal();renderGrid('#home-products',P.slice(0,4));initCatalog();renderProduct();initTracking();initContact();initAccount();if(!window.ASPEN_CHECKOUT_CONTROLLER)initCheckout();renderFullCart();bindAdds()});
})();