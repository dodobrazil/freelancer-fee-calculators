// Fee math. Percentages are given as numbers like 3.49 (meaning 3.49%).
const r2 = (x) => Math.round((x + Number.EPSILON) * 100) / 100;

// What you receive when the payer pays `amount`.
// Order: percentage + fixed fee -> optional currency conversion spread on what is left -> flat withdrawal fee.
export function computeNet({ amount, pct = 0, fixed = 0, conversionPct = 0, withdrawalFee = 0 }) {
  if (!(amount >= 0)) throw new RangeError("amount must be >= 0");
  const fee = amount > 0 ? amount * pct / 100 + fixed : 0;
  const afterFee = Math.max(0, amount - fee);
  const conversion = afterFee * conversionPct / 100;
  const net = Math.max(0, afterFee - conversion - (amount > 0 ? withdrawalFee : 0));
  const total = amount - net;
  return { amount: r2(amount), fee: r2(fee), conversion: r2(conversion), withdrawal: r2(amount > 0 ? withdrawalFee : 0), net: r2(net), totalFees: r2(total), effectivePct: amount > 0 ? r2(total / amount * 100) : 0 };
}

// What to charge so that `target` is what you receive (inverse of computeNet).
export function requiredAmount({ target, pct = 0, fixed = 0, conversionPct = 0, withdrawalFee = 0 }) {
  if (!(target > 0)) return 0;
  if (pct >= 100 || conversionPct >= 100) throw new RangeError("percentage too high");
  const beforeConversion = (target + withdrawalFee) / (1 - conversionPct / 100);
  return r2((beforeConversion + fixed) / (1 - pct / 100));
}

// Fiverr buyer side: what the buyer pays on top of the order price.
export function buyerTotal({ amount, pct = 5.5, smallFee = 3.5, threshold = 200 }) {
  const serviceFee = amount * pct / 100;
  const small = amount > 0 && amount < threshold ? smallFee : 0;
  return { serviceFee: r2(serviceFee), smallOrderFee: r2(small), total: r2(amount + serviceFee + small) };
}
