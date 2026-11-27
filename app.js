import { computeNet, requiredAmount, buyerTotal } from "./calc.js";
const $ = (id) => document.getElementById(id);
const page = document.body.dataset.page;
const num = (id) => { const v = parseFloat($(id)?.value); return Number.isFinite(v) && v >= 0 ? v : 0; };
const cur = () => ($("cur") ? $("cur").value : "USD");
const money = (x) => { try { return new Intl.NumberFormat("en-US", { style: "currency", currency: cur() }).format(x); } catch { return x.toFixed(2); } };

function params() {
  if (page === "upwork") return { pct: num("rate"), fixed: 0, conversionPct: 0, withdrawalFee: parseFloat($("wd").value) || 0 };
  if (page === "fiverr") return { pct: num("rate"), fixed: 0, conversionPct: 0, withdrawalFee: 0 };
  const base = parseFloat($("method").value) + ($("intl").checked ? 1.5 : 0);
  return { pct: base, fixed: parseFloat($("cur").selectedOptions[0].dataset.fixed), conversionPct: parseFloat($("conv").value) || 0, withdrawalFee: 0 };
}
function render() {
  const p = params(); const mode = $("mode").value; const v = num("amount");
  let amount = v, target;
  try {
    if (mode === "target") { target = v; amount = requiredAmount({ target: v, ...p }); }
    const r = computeNet({ amount, ...p });
    const rows = [[mode === "target" ? "You should charge" : "Client pays", amount, mode === "target"], ["Platform fee", -r.fee]];
    if (p.conversionPct) rows.push(["Currency conversion spread", -r.conversion]);
    if (p.withdrawalFee) rows.push(["Withdrawal fee", -r.withdrawal]);
    rows.push(["You receive", r.net, true]);
    let h = rows.map(([l, x, b]) => `<tr${b ? ' class="big"' : ""}><td>${l}</td><td>${x < 0 ? "-" : ""}${money(Math.abs(x))}</td></tr>`).join("");
    h += `<tr><td>Total fees</td><td>${money(r.totalFees)} (${r.effectivePct}%)</td></tr>`;
    if (page === "fiverr") { const b = buyerTotal({ amount }); h += `<tr><td>Buyer also pays (5.5% + small-order fee)</td><td>${money(b.serviceFee + b.smallOrderFee)}</td></tr><tr><td>Buyer total</td><td>${money(b.total)}</td></tr>`; }
    $("out").innerHTML = h;
  } catch (e) { $("out").innerHTML = `<tr><td>Check your inputs.</td><td></td></tr>`; }
}
document.querySelectorAll("form.calc input, form.calc select").forEach((el) => el.addEventListener("input", render));
$("mode").addEventListener("change", () => { $("amtlabel").textContent = $("mode").value === "target" ? "Amount you want to receive" : "Amount the client pays"; });
document.querySelector("form.calc").addEventListener("submit", (e) => e.preventDefault());
render();
