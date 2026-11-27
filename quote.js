import { computeNet } from "./calc.js";
const r2 = (x) => Math.round((x + Number.EPSILON) * 100) / 100;
const n = (x) => (Number.isFinite(x) && x > 0 ? x : 0);

// items: [{hours, rate}]. revisionPct applies to the subtotal; rushPct applies to subtotal + revision buffer.
export function computeQuote({ items = [], revisionPct = 0, rushPct = 0, depositPct = 0, platformPct = 0, platformFixed = 0 }) {
  const lines = items.map((i) => r2(n(i.hours) * n(i.rate)));
  const subtotal = r2(lines.reduce((a, b) => a + b, 0));
  const revision = r2(subtotal * n(revisionPct) / 100);
  const rush = r2((subtotal + revision) * n(rushPct) / 100);
  const total = r2(subtotal + revision + rush);
  const deposit = r2(total * Math.min(n(depositPct), 100) / 100);
  const hours = r2(items.reduce((a, i) => a + n(i.hours), 0));
  const net = computeNet({ amount: total, pct: n(platformPct), fixed: n(platformFixed) });
  return { lines, subtotal, revision, rush, total, deposit, balance: r2(total - deposit), hours, platformFee: net.fee, youKeep: net.net, effectiveRate: hours > 0 ? r2(net.net / hours) : 0 };
}
