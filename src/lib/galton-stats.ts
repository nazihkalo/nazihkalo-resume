export function computeMean(binCounts: number[]): number {
  let totalWeight = 0;
  let totalCount = 0;
  for (let i = 0; i < binCounts.length; i++) {
    totalWeight += i * binCounts[i];
    totalCount += binCounts[i];
  }
  if (totalCount === 0) return binCounts.length / 2;
  return totalWeight / totalCount;
}

export function computeStdDev(binCounts: number[], mean: number): number {
  let totalVariance = 0;
  let totalCount = 0;
  for (let i = 0; i < binCounts.length; i++) {
    totalVariance += binCounts[i] * (i - mean) ** 2;
    totalCount += binCounts[i];
  }
  if (totalCount === 0) return 0;
  return Math.sqrt(totalVariance / totalCount);
}

export function formatStats(binCounts: number[]) {
  const total = binCounts.reduce((a, b) => a + b, 0);
  const mean = computeMean(binCounts);
  const stdDev = computeStdDev(binCounts, mean);
  return {
    mean: mean.toFixed(2),
    stdDev: stdDev.toFixed(2),
    totalBalls: total,
  };
}

export function theoreticalGalton(pegRows: number) {
  const numBins = pegRows + 3;
  return {
    mean: (numBins - 1) / 2,
    stdDev: Math.sqrt(pegRows * 0.25),
  };
}

// Poisson PMF: P(X=k) = (lambda^k * e^-lambda) / k!
export function poissonPmf(k: number, lambda: number): number {
  let logP = -lambda + k * Math.log(lambda);
  for (let i = 2; i <= k; i++) logP -= Math.log(i);
  return Math.exp(logP);
}

// Exponential PDF: f(x) = lambda * e^(-lambda * x)
export function exponentialPdf(x: number, lambda: number): number {
  return lambda * Math.exp(-lambda * x);
}

export function computeMeanFromArray(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function computeStdDevFromArray(arr: number[], mean: number): number {
  if (arr.length === 0) return 0;
  const variance = arr.reduce((sum, v) => sum + (v - mean) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}
