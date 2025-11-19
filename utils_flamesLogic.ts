/**
 * Sanitizes names and performs the FLAMES calculation, returning one of six types.
 */

export type FlamesResult = "Friendship" | "Love" | "Affection" | "Marriage" | "Enemy" | "Sibling";

const FLAMES_MAP: FlamesResult[] = [
  "Friendship", "Love", "Affection", "Marriage", "Enemy", "Sibling"
];

export function sanitizeName(name: string): string {
  // Remove whitespace and convert to lowercase
  return name.replace(/[^a-zA-Z]/g, '').toLowerCase();
}

export function flamesCalculation(name1: string, name2: string): FlamesResult {
  let n1Arr = sanitizeName(name1).split("");
  let n2Arr = sanitizeName(name2).split("");
  // Remove common characters
  for (let i = 0; i < n1Arr.length; i++) {
    const idx = n2Arr.indexOf(n1Arr[i]);
    if (idx !== -1) {
      n2Arr.splice(idx, 1);
      n1Arr[i] = ""; // Remove from first name as well
    }
  }
  const totalCount = n1Arr.filter(Boolean).length + n2Arr.length;
  // FLAMES elimination algorithm
  let flamesArr = [...FLAMES_MAP];
  let idx = 0;
  while (flamesArr.length > 1) {
    idx = (totalCount % flamesArr.length) - 1;
    if (idx >= 0) {
      flamesArr = [...flamesArr.slice(idx + 1), ...flamesArr.slice(0, idx)];
    } else {
      flamesArr.pop();
    }
  }
  return flamesArr[0];
}