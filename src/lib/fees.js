// Tuition is shown as a range centred on the set amount, so families see a
// realistic band rather than a single hard figure. The amount we configure is
// the MIDDLE of the range; the band is ±100,000 UGX by default
// (e.g. 700,000 → "600,000 to 800,000").
const FEE_SPREAD = 100000

const fmt = (n) => n.toLocaleString('en-US')

export function feeRange(base, spread = FEE_SPREAD) {
  const low = Math.max(0, base - spread)
  return `${fmt(low)} to ${fmt(base + spread)}`
}

// Termly tuition, in UGX — the single source for every fee shown on the site.
// Nursery and Primary currently share the same bands at both campuses:
//   Day       UGX 400,000 to 600,000
//   Boarding  UGX 600,000 to 800,000
export const FEES = {
  nursery: { day: 500000, boarding: 700000 },
  primary: { day: 500000, boarding: 700000 },
}
