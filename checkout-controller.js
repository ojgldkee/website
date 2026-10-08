(() => {
"use strict";

window.ASPEN_CHECKOUT_CONTROLLER = true;

const q = (selector, root = document) => root.querySelector(selector);
const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const STORE = window.STORE || { currency: "USD", shippingThreshold: 250 };
const PRODUCTS = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];

const CART_KEYS = [
  "aspen-labs-cart-v2",
  "aspen-labs-cart-backup-v1",
  "forma-cart-v2"
];
const DATA_KEY = "aspen-labs-checkout-data-v1";
const SHIP_KEY = "aspen-checkout-shipping-method";
const ORDER_KEY = "aspen-labs-payment-order-v1";

const money = value =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: STORE.currency || "USD"
  }).format(Number(value) || 0);

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function readCart() {
  for (const key of CART_KEYS) {
    const value = readJson(key, null);
    if (Array.isArray(value) && value.length) return value;
  }
  return [];
}

function productFor(slug) {
  const normalized = slug === "etatrutide" ? "retatrutide" : slug;
  return PRODUCTS.find(product => product.slug === normalized);
}

function variantsFor(product) {
  return Array.isArray(product?.variants) && product.variants.length
    ? product.variants
    : [{ label: "Default", price: product?.price ?? 0 }];
}

function variantFor(product, label) {
  const variants = variantsFor(product);
  return variants.find(variant => variant.label === label) || variants[0];
}

function imageFor(product, variant) {
  const variants = variantsFor(product);
  const index = Math.max(0, variants.findIndex(item => item.label === variant?.label));
  if (Array.isArray(product?.gallery) && product.gallery[index]) return product.gallery[index];
  return product?.image || "";
}

function buildOrderLines() {
  const lines = [];

  for (const cartLine of readCart()) {
    const product = productFor(cartLine.slug);
    if (!product) continue;

    const variant = variantFor(product, cartLine.variant);
    const unitPrice = Number(variant?.price ?? product.price);
    const qty = Math.max(1, Math.min(100, Number(cartLine.qty) || 1));

    if (!Number.isFinite(unitPrice) || unitPrice < 0) continue;

    lines.push({
      slug: product.slug,
      name: product.name,
      variant: variant?.label || "",
      qty,
      unitPrice,
      lineTotal: unitPrice * qty,
      image: imageFor(product, variant)
    });
  }

  return lines;
}

function subtotalOf(lines) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}

function qualifiesForFreeShipping(subtotal) {
  return subtotal >= Number(STORE.shippingThreshold || 250);
}

function validShippingMethods(subtotal) {
  return qualifiesForFreeShipping(subtotal)
    ? ["free", "priority"]
    : ["standard", "priority"];
}

function shippingCost(method, subtotal) {
  if (method === "free" && qualifiesForFreeShipping(subtotal)) return 0;
  if (method === "priority") return 14.99;
  return 4.99;
}

function chooseShippingMethod(subtotal) {
  const allowed = validShippingMethods(subtotal);
  const saved = localStorage.getItem(SHIP_KEY);

  if (saved && allowed.includes(saved)) return saved;
  return qualifiesForFreeShipping(subtotal) ? "free" : "standard";
}

function syncShipping(lines) {
  const subtotal = subtotalOf(lines);
  const qualifies = qualifiesForFreeShipping(subtotal);

  const standardCard = q('[data-ship-method="standard"]');
  const priorityCard = q('[data-ship-method="priority"]');
  const freeCard = q('[data-ship-method="free"]');

  if (standardCard) {
    standardCard.hidden = qualifies;
    standardCard.style.display = qualifies ? "none" : "";
    const radio = q('input[name="ship"]', standardCard);
    if (radio) radio.disabled = qualifies;
  }

  if (priorityCard) {
    priorityCard.hidden = false;
    priorityCard.style.display = "";
    const radio = q('input[name="ship"]', priorityCard);
    if (radio) radio.disabled = false;
  }

  if (freeCard) {
    freeCard.hidden = !qualifies;
    freeCard.style.display = qualifies ? "" : "none";
    const radio = q('input[name="ship"]', freeCard);
    if (radio) radio.disabled = !qualifies;
  }

  const method = chooseShippingMethod(subtotal);

  qa('input[name="ship"]').forEach(radio => {
    radio.checked = radio.value === method;
    radio.closest(".checkout-method")?.classList.toggle("selected", radio.checked);
  });

  localStorage.setItem(SHIP_KEY, method);
  return method;
}

function syncCryptoSelection(form) {
  const crypto = q('input[name="payment"][value="crypto"]', form);
  qa('input[name="payment"]', form).forEach(radio => {
    radio.checked = false;
    radio.closest(".checkout-method")?.classList.remove("selected");
  });

  if (crypto) {
    crypto.checked = true;
    crypto.closest(".checkout-method")?.classList.add("selected");
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderSummary() {
  const root = q("#checkout-summary");
  if (!root) return;

  const lines = buildOrderLines();

  if (!lines.length) {
    root.innerHTML =
      '<div class="summary-line"><span>Your cart is empty</span><strong>—</strong></div>';
    return;
  }

  const subtotal = subtotalOf(lines);
  const method = syncShipping(lines);
  const shipping = shippingCost(method, subtotal);
  const total = subtotal + shipping;

  const items = lines.map(line => {
    const variant = line.variant
      ? '<small class="checkout-order-variant">' + escapeHtml(line.variant) + "</small>"
      : "";

    return (
      '<div class="checkout-order-item">' +
        '<div class="checkout-order-thumb">' +
          '<img src="' + escapeHtml(line.image) + '" alt="' + escapeHtml(line.name) + '">' +
        "</div>" +
        '<div class="checkout-order-copy">' +
          "<strong>" + escapeHtml(line.name) + "</strong>" +
          variant +
          "<small>Qty " + line.qty + " · " + money(line.unitPrice) + " each</small>" +
        "</div>" +
        '<strong class="checkout-order-line-total">' + money(line.lineTotal) + "</strong>" +
      "</div>"
    );
  }).join("");

  const shippingLabel =
    method === "priority"
      ? "Priority shipping"
      : method === "free"
        ? "Free tracked shipping"
        : "Standard shipping";

  root.innerHTML =
    items +
    '<div class="summary-line"><span>Subtotal</span><strong>' + money(subtotal) + "</strong></div>" +
    '<div class="summary-line"><span>' + shippingLabel + '</span><strong>' +
      (shipping === 0 ? "Free" : money(shipping)) +
    "</strong></div>" +
    '<div class="summary-line total"><strong>Estimated total</strong><strong>' +
      money(total) +
    "</strong></div>";
}

function readCheckoutData() {
  return readJson(DATA_KEY, {}) || {};
}

function saveCheckoutData(form) {
  const data = { ...readCheckoutData() };

  qa("input,select,textarea", form).forEach(element => {
    const key = element.name || element.id;
    if (!key) return;

    if (element.type === "radio") {
      if (element.checked) data[key] = element.value;
    } else if (element.type === "checkbox") {
      data[key] = Boolean(element.checked);
    } else {
      data[key] = element.value;
    }
  });

  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function restoreCheckoutData(form) {
  const data = readCheckoutData();

  qa("input,select,textarea", form).forEach(element => {
    const key = element.name || element.id;
    if (!key || !(key in data)) return;

    if (element.type === "radio") {
      element.checked = String(data[key]) === String(element.value);
    } else if (element.type === "checkbox") {
      element.checked = Boolean(data[key]);
    } else {
      element.value = data[key] ?? "";
    }
  });
}

function populateCountries() {
  const select = q("#country");
  if (!select || select.options.length > 1) return;

  const codes = "US CA MX GB IE FR DE ES PT IT NL BE LU CH AT DK SE NO FI IS PL CZ SK HU RO BG GR HR SI RS BA ME MK AL EE LV LT UA MD BY RU TR CY MT AD MC SM VA LI AU NZ JP KR CN HK MO TW SG MY TH VN PH ID BN KH LA MM IN PK BD LK NP BT MV AF KZ UZ TM KG TJ MN AE SA QA KW BH OM IL JO LB SY IQ IR YE GE AM AZ ZA EG MA DZ TN LY SD SS ET ER DJ SO KE UG TZ RW BI CD CG GA GQ CM CF TD NG NE ML BF SN GM GW GN SL LR CI GH TG BJ MR CV ST AO ZM ZW BW NA SZ LS MZ MW MG MU SC KM BR AR CL PE BO PY UY CO VE EC GY SR GF PA CR NI HN SV GT BZ CU DO HT JM TT BB BS GD LC VC AG DM KN PR VI BM GL FO AI AW CW SX BQ KY TC VG MS FK GI JE GG IM AX SJ PM PF NC WF FJ PG SB VU WS TO KI TV NR PW FM MH CK NU TK GU MP AS UM CC CX NF HM TF AQ BV SH IO PS EH".split(" ");

  let displayNames = null;
  try {
    displayNames = new Intl.DisplayNames([navigator.language || "en"], { type: "region" });
  } catch {}

  codes
    .map(code => ({ code, name: displayNames?.of(code) || code }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(item => {
      const option = document.createElement("option");
      option.value = item.code;
      option.textContent = item.name;
      select.appendChild(option);
    });
}

function showError(field, message) {
  const status = q("#checkoutStatus");

  if (status) {
    status.textContent = message;
    status.classList.add("error");
  }

  qa(".checkout-field-error").forEach(element =>
    element.classList.remove("checkout-field-error")
  );

  if (field) {
    field.classList.add("checkout-field-error");
    field.closest(".checkout-card")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else {
    status?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function validate(form) {
  for (const element of qa("[required]", form)) {
    if (element.type === "checkbox" && !element.checked) {
      return [element, "Please accept the terms before continuing."];
    }

    if (element.type === "email") {
      const value = element.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return [element, "Please enter a valid email address before continuing."];
      }
      continue;
    }

    if (element.type !== "checkbox" && !String(element.value || "").trim()) {
      const label =
        element.closest(".field")?.querySelector("label")?.textContent
          ?.replace(/Optional/gi, "")
          .trim() || "required field";

      return [element, "Please complete " + label + " before continuing."];
    }
  }

  return null;
}

function savePaymentOrder() {
  const lines = buildOrderLines();
  const subtotal = subtotalOf(lines);
  const method = chooseShippingMethod(subtotal);
  const shipping = shippingCost(method, subtotal);

  const order = {
    createdAt: Date.now(),
    items: lines,
    subtotal,
    shipping,
    shippingMethod: method,
    total: subtotal + shipping
  };

  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  return order;
}

function init() {
  const form = q("#checkoutForm");
  if (!form) return;

  const lines = buildOrderLines();

  if (!lines.length) {
    location.replace("cart.html");
    return;
  }

  populateCountries();
  restoreCheckoutData(form);

  const subtotal = subtotalOf(lines);
  const restoredShipping = q('input[name="ship"]:checked', form)?.value;

  if (restoredShipping && validShippingMethods(subtotal).includes(restoredShipping)) {
    localStorage.setItem(SHIP_KEY, restoredShipping);
  } else if (!validShippingMethods(subtotal).includes(localStorage.getItem(SHIP_KEY))) {
    localStorage.setItem(
      SHIP_KEY,
      qualifiesForFreeShipping(subtotal) ? "free" : "standard"
    );
  }

  syncCryptoSelection(form);
  syncShipping(lines);
  renderSummary();

  const shippingMethods = q("#shippingMethods");

  shippingMethods?.addEventListener("click", event => {
    const card = event.target.closest(".checkout-method");
    if (!card || card.hidden) return;

    const radio = q('input[name="ship"]', card);
    if (!radio || radio.disabled) return;

    qa('input[name="ship"]', form).forEach(item => {
      item.checked = false;
      item.closest(".checkout-method")?.classList.remove("selected");
    });

    radio.checked = true;
    card.classList.add("selected");

    localStorage.setItem(SHIP_KEY, radio.value);
    saveCheckoutData(form);
    renderSummary();
  });

  form.addEventListener("change", event => {
    if (event.target.matches('input[name="ship"]')) {
      qa('input[name="ship"]', form).forEach(item => {
        item.closest(".checkout-method")?.classList.toggle(
          "selected",
          item.checked
        );
      });

      localStorage.setItem(SHIP_KEY, event.target.value);
      renderSummary();
    }

    if (event.target.matches('input[name="payment"]')) {
      syncCryptoSelection(form);
    }

    saveCheckoutData(form);
  });

  form.addEventListener("input", () => saveCheckoutData(form));

  form.addEventListener(
    "submit",
    event => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const status = q("#checkoutStatus");
      if (status) {
        status.textContent = "";
        status.classList.remove("error");
      }

      syncCryptoSelection(form);

      const validationError = validate(form);
      if (validationError) {
        showError(validationError[0], validationError[1]);
        return;
      }

      const order = savePaymentOrder();

      if (!order.items.length) {
        showError(null, "Your cart is empty. Add a product before continuing.");
        return;
      }

      saveCheckoutData(form);

      if (status) status.textContent = "Opening payment…";
      location.href = "crypto-payment.html";
    },
    true
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
})();