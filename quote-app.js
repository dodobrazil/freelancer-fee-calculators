import { computeQuote } from "./quote.js";
const $ = (id) => document.getElementById(id);
const num = (id) => { const v = parseFloat($(id).value); return Number.isFinite(v) && v >= 0 ? v : 0; };
const money = (x) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(x);
const items = $("items");
function addRow(label, hours, rate) {
  const d = document.createElement("div"); d.className = "grid item"; d.style.marginTop = "8px";
  d.innerHTML = '<div><label>Item</label><input class="it-l" type="text" maxlength="60"></div><div><label>Hours</label><input class="it-h" type="number" min="0" step="0.25" inputmode="decimal"></div><div><label>Rate per hour (USD)</label><input class="it-r" type="number" min="0" step="1" inputmode="decimal"></div><div><button type="button" class="rm">Remove</button></div>';
  d.querySelector(".it-l").value = label; d.querySelector(".it-h").value = hours; d.querySelector(".it-r").value = rate;
  d.querySelector(".rm").addEventListener("click", () => { d.remove(); render(); });
  items.appendChild(d);
}
function render() {
  const rows = [...items.querySelectorAll(".item")].map((d) => ({ hours: parseFloat(d.querySelector(".it-h").value), rate: parseFloat(d.querySelector(".it-r").value) }));
  const custom = $("plat").value === "custom";
  const [pct, fixed] = custom ? [num("cpct"), 0] : $("plat").value.split(",").map(Number);
  $("customwrap").hidden = !custom;
  const r = computeQuote({ items: rows, revisionPct: num("rev"), rushPct: num("rush"), depositPct: num("dep"), platformPct: pct, platformFixed: fixed });
  const t = [["Items subtotal", r.subtotal], ["Revision buffer", r.revision], ["Rush surcharge", r.rush], ["Quote total", r.total, 1], ["Upfront deposit", r.deposit], ["Balance on delivery", r.balance], ["Platform fee", -r.platformFee], ["You keep", r.youKeep, 1]];
  let h = t.map(([l, x, b]) => `<tr${b ? ' class="big"' : ""}><td>${l}</td><td>${x < 0 ? "-" : ""}${money(Math.abs(x))}</td></tr>`).join("");
  h += `<tr><td>Hours quoted</td><td>${r.hours}</td></tr><tr><td>What you keep per quoted hour</td><td>${money(r.effectiveRate)}</td></tr>`;
  $("out").innerHTML = h;
}
$("add").addEventListener("click", () => { addRow("", 1, 50); render(); });
document.querySelector("form.calc").addEventListener("input", render);
document.querySelector("form.calc").addEventListener("submit", (e) => e.preventDefault());
addRow("Design", 6, 50); addRow("Development", 10, 50); render();
