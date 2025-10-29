export function chiSquaredPValue(chiSquared: number, degreesOfFreedom: number) {
  // The p-value is P(X ≥ χ²) = 1 - P(X < χ²)
  // which equals 1 - P(df/2, χ²/2) using the regularized incomplete gamma function
  const k = degreesOfFreedom / 2;
  const x = chiSquared / 2;
  const rgp = regularizedGammaP(k, x);
  return 1 - (Number.isNaN(rgp) ? 1 : rgp);
}

// Calculate the incomplete gamma function using series expansion
function lowerIncompleteGamma(s: number, x: number) {
  if (x === 0) {
    return 0;
  }
  const maxIterations = 1000;
  const epsilon = 1e-10;
  let sum = 1 / s;
  let term = 1 / s;
  for (let n = 1; n < maxIterations; n++) {
    term *= x / (s + n);
    sum += term;
    if (Math.abs(term) < epsilon * Math.abs(sum)) {
      break;
    }
  }
  return x ** s * Math.exp(-x) * sum;
}

// Calculate the regularized incomplete gamma function P(s, x)
function regularizedGammaP(s: number, x: number) {
  const gammaS = Math.exp(lnGamma(s));
  const lowerGamma = lowerIncompleteGamma(s, x);
  return lowerGamma / gammaS;
}

// Lanczos approximation for ln(Γ(z))
function lnGamma(z: number) {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  let zToUse = z;
  let reflectionTerm = 0;
  // Apply reflection formula if z < 0.5
  if (z < 0.5) {
    reflectionTerm = Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z));
    zToUse = 1 - z;
  }
  // Apply Lanczos approximation for zToUse >= 0.5
  zToUse -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) {
    x += c[i] / (zToUse + i);
  }
  const t = zToUse + g + 0.5;
  const lanczosResult =
    0.5 * Math.log(2 * Math.PI) +
    (zToUse + 0.5) * Math.log(t) -
    t +
    Math.log(x);
  // If we applied reflection, adjust the result
  if (z < 0.5) {
    return reflectionTerm - lanczosResult;
  }
  return lanczosResult;
}
