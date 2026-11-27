// All fee numbers live here. status: "verified" = seen on an official page of the platform (fetched or quoted in an official-page search excerpt);
// "unverified" = could not be confirmed from an official page; shown as such on the site.
export const CHECKED = "2026-11-22";

const UP = "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";
const UP_LB = "https://support.upwork.com/hc/en-us/articles/211060578-What-are-the-fees-limits-and-timing-of-Direct-to-Local-Bank-payments";
const UP_US = "https://support.upwork.com/hc/en-us/articles/227022468-Direct-to-U-S-Bank-timing-and-fees-explained";
const UP_WIRE = "https://support.upwork.com/hc/en-us/articles/211063898-How-do-wire-transfers-work-on-Upwork";
const FV_BUY = "https://help.fiverr.com/hc/en-us/articles/360050216133-Paying-for-orders-extras-or-custom-offers";
const FV_PRO = "https://help.fiverr.com/hc/en-us/articles/29453184449169-Fiverr-Pro-freelancer-Badge-and-benefits";
const FV_GUIDE = "https://www.fiverr.com/resources/guides/business/fiverr-vs-upwork";
const PP = "https://securepayments.paypal.com/us/business/paypal-business-fees";
const PP_US = "https://securepayments.paypal.com/us/business/fees";
const UP_CIF = "https://support.upwork.com/hc/en-us/articles/26106318334611-What-is-the-Contract-Initiation-Fee-on-Upwork";
const UP_PP = "https://support.upwork.com/hc/en-us/articles/211063968-How-to-use-PayPal-to-withdraw-your-earnings";
const FV_WD = "https://help.fiverr.com/hc/en-us/articles/360010530058-Withdrawing-your-earnings-managing-payout-methods";
const WISE_RCV = "https://wise.com/us/pricing/receive";

const e = (id, label, value, unit, status, source, note = "", checked = CHECKED) => ({ id, label, value, unit, status, source, checked, note });
const C2 = "2026-11-24"; // entries re-read on the official page on this date

export const FEES = {
  upwork: [
    e("service_fee_min", "Freelancer service fee, lowest", 0, "%", "verified", UP, "Upwork help: the fee ranges from 0% to 15% per contract, is fixed once the contract begins, and is shown on your proposal or offer.", C2),
    e("service_fee_max", "Freelancer service fee, highest", 15, "%", "verified", UP, "See above. Older flat 10% (2023) is no longer the stated rule.", C2),
    e("service_fee_default", "Default used in calculator (editable)", 10, "%", "unverified", UP, "Rechecked 2026-11-24 in a browser: the page states only the 0-15% range and no default. It mentions about 10% for Enterprise clients, but that is not a default for everyone. Placeholder only: type the fee shown on your own proposal.", C2),
    e("withdraw_local_bank", "Direct to local bank (non-US), per withdrawal", 0.99, "USD", "verified", UP_LB, "Your bank may add incoming fees or an exchange spread."),
    e("withdraw_us_bank_nonus_tax", "Direct to U.S. bank, per withdrawal, if tax address is outside the US (from 2026-09-01)", 2.99, "USD", "verified", UP_US, "Re-read on the Upwork page 2026-11-26: applies to withdrawals initiated or executing on or after 2026-09-01; free with a US tax address."),
    e("withdraw_wire", "USD wire transfer, per withdrawal", 50, "USD", "verified", UP_WIRE, "Receiving bank may add its own charges."),
    e("client_initiation_min", "Client contract initiation fee, lowest (one-time per contract)", 0.99, "USD", "verified", UP_CIF, "Paid by the client, not deducted from the freelancer. Varies by contract type, account history and hiring activity.", C2),
    e("client_initiation_max", "Client contract initiation fee, highest (one-time per contract)", 14.99, "USD", "verified", UP_CIF, "See above.", C2),
    e("client_fee", "Client marketplace fee (percentage)", null, "%", "unverified", UP, "Rechecked 2026-11-24: the Upwork pages read describe a one-time contract initiation fee (above), not a percentage. Not used in the calculator.", C2),
    e("paypal_withdraw", "Withdrawal to PayPal", null, "USD", "unverified", UP_PP, "Rechecked 2026-11-24: Upwork says PayPal is a third-party vendor whose features and fees vary by location, and gives no figure. Older community posts say about 1-2 USD (unreliable).", C2),
  ],
  fiverr: [
    e("seller_commission", "Seller commission on every order (incl. extras and tips)", 20, "%", "verified", FV_PRO, "Fiverr Help Center (Fiverr Pro freelancer badge and benefits): \"you get 80%\", i.e. a 20% commission. Fiverr's business guides also state 20% on every sale including tips.", "2026-11-26"),
    e("buyer_fee", "Buyer service fee", 5.5, "%", "verified", FV_BUY, "Paid by the buyer on top of the order price, not deducted from the seller."),
    e("buyer_small_fee", "Buyer small-order fee (orders under threshold)", 3.5, "USD", "verified", FV_BUY, "Fiverr Help Center and Payment Terms (Sept 2025) say $3.50 under $200. Some older pages say $3 under $100."),
    e("buyer_small_threshold", "Small-order threshold", 200, "USD", "verified", FV_BUY, "See above."),
    e("withdraw_paypal", "Seller withdrawal to PayPal, per withdrawal", 0, "USD", "verified", FV_WD, "Minimum withdrawal $1; about 24 hours.", C2),
    e("withdraw_bank_payoneer", "Seller withdrawal, bank transfer via Payoneer, per withdrawal", 1, "USD", "verified", FV_WD, "Minimum withdrawal $20; 1-3 business days (local currency) or 5-7 (USD wire). Payoneer may add its own charges.", C2),
    e("withdraw_payoneer_account", "Seller withdrawal to a Payoneer account, per withdrawal", 3, "USD", "verified", FV_WD, "Minimum withdrawal $10; up to 2 business days.", C2),
    e("withdraw_max_per_tx", "Fiverr maximum per withdrawal transaction", 5000, "USD", "verified", FV_WD, "The Fiverr Revenue Card ($1-$3) was discontinued in December 2022 and is only for existing cardholders.", C2),
  ],
  paypal: [
    e("paypal_pct", "PayPal / Venmo / invoice (PayPal balance) payments, percentage", 3.49, "%", "verified", PP_US, "US business pricing page."),
    e("cards_pct", "Standard credit and debit card payments, percentage", 2.99, "%", "verified", PP, "Fixed fee applies as below."),
    e("intl_pct", "Extra fee for commercial transactions received from another country", 1.5, "%", "verified", PP, "Added to the domestic rate."),
    e("conv_other", "Currency conversion spread, paying/receiving in a different currency", 4, "%", "verified", PP, "Page says 4.00%, or another amount disclosed during the transaction."),
    e("conv_all", "Currency conversion spread, all other transactions", 3, "%", "verified", PP, "Page says 3.00%, or another amount disclosed during the transaction."),
    e("fixed_USD", "Fixed fee per transaction, US dollar", 0.49, "USD", "verified", PP_US, ""),
    e("fixed_EUR", "Fixed fee per transaction, euro", 0.39, "EUR", "verified", PP, ""),
    e("fixed_GBP", "Fixed fee per transaction, pound sterling", 0.39, "GBP", "verified", PP, ""),
    e("fixed_CAD", "Fixed fee per transaction, Canadian dollar", 0.59, "CAD", "verified", PP, ""),
    e("fixed_AUD", "Fixed fee per transaction, Australian dollar", 0.59, "AUD", "verified", PP, ""),
    e("instant_pct", "Instant transfer to bank or card", 1.5, "%", "verified", PP, "Standard bank transfer has no fee when no currency conversion is involved."),
    e("instant_min_usd", "Instant transfer minimum fee, US dollar", 0.5, "USD", "verified", PP, "Rechecked 2026-11-23 on the PayPal US page: 1.50% of amount transferred, minimum 0.50 USD."),
    e("instant_max", "Instant transfer maximum fee", null, "USD", "unverified", PP, "Rechecked 2026-11-23: no maximum fee stated in the part read; only per-transaction limits (25,000 USD bank, 50,000 USD card)."),
    e("wise_usd_wire", "Comparison: Wise, receiving a USD wire/Swift payment, per payment", 6.11, "USD", "verified", WISE_RCV, "Wise domestic receiving (e.g. ACH) and account details are listed as free."),
  ],
};

export const val = (platform, id) => FEES[platform].find((f) => f.id === id)?.value;

// Fiverr seller withdrawal: fee, minimum and per-transaction maximum from the Fiverr Help Center (read 2026-11-26).
export const FIVERR_WITHDRAW = [
  { id: "paypal", label: "PayPal", feeId: "withdraw_paypal", min: 1, time: "24 hours" },
  { id: "bank", label: "Bank transfer via Payoneer", feeId: "withdraw_bank_payoneer", min: 20, time: "1-3 business days (local currency) or 5-7 (USD wire)" },
  { id: "payoneer", label: "Payoneer account", feeId: "withdraw_payoneer_account", min: 10, time: "up to 2 business days" },
];
export function fiverrWithdrawal(amount, methodId) {
  const m = FIVERR_WITHDRAW.find((x) => x.id === methodId);
  const max = val("fiverr", "withdraw_max_per_tx");
  if (!m || !(amount > 0)) return { ok: false, reason: "invalid" };
  if (amount < m.min) return { ok: false, reason: "below_min", min: m.min };
  if (amount > max) return { ok: false, reason: "above_max", max };
  const fee = val("fiverr", m.feeId);
  return { ok: true, fee, net: Math.round((amount - fee) * 100) / 100, feePct: Math.round((fee / amount) * 10000) / 100 };
}
// Upwork client contract initiation fee as a share of the contract value (client side; not deducted from the freelancer).
export function initiationFeePct(contractValue, fee) {
  if (!(contractValue > 0) || !(fee >= 0)) return null;
  return Math.round((fee / contractValue) * 10000) / 100;
}
// PayPal fixed fee per commercial transaction by currency received (PayPal US business fees page, read 2026-11-26).
export const PAYPAL_FIXED = [
  ["AUD","Australian dollar",0.59],["BRL","Brazilian real",2.9],["CAD","Canadian dollar",0.59],["CZK","Czech koruna",9],["DKK","Danish krone",2.9],["EUR","Euro",0.39],["HKD","Hong Kong dollar",3.79],["HUF","Hungarian forint",149],["ILS","Israeli new shekel",1.6],["JPY","Japanese yen",49],["MYR","Malaysian ringgit",2],["MXN","Mexican peso",9],["TWD","New Taiwan dollar",14],["NZD","New Zealand dollar",0.69],["NOK","Norwegian krone",3.9],["PHP","Philippine peso",25],["PLN","Polish zloty",1.89],["RUB","Russian ruble",39],["SGD","Singapore dollar",0.69],["SEK","Swedish krona",4.09],["CHF","Swiss franc",0.49],["THB","Thai baht",15],["GBP","UK pound sterling",0.39],["USD","US dollar",0.49],
].map(([code, name, fee]) => ({ code, name, fee }));
// Fixed fee as a share of a payment, in the same currency (percent, 2 decimals).
export function fixedFeeShare(amount, fee) {
  if (!(amount > 0) || !(fee >= 0)) return null;
  return Math.round((fee / amount) * 10000) / 100;
}
// Flat withdrawal fee paid over a year for a given number of withdrawals (same fee each time).
export function annualWithdrawalCost(fee, perYear) {
  if (!(fee >= 0) || !(perYear > 0)) return null;
  return Math.round(fee * perYear * 100) / 100;
}
export const WITHDRAW_FREQ = [["Weekly", 52], ["Every two weeks", 26], ["Monthly", 12], ["Quarterly", 4]];
