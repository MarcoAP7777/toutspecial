module.exports = {
  metrics: {
    firstContentfulPaint: {
      threshold: 2000,
      weight: 0.3,
    },
    largestContentfulPaint: {
      threshold: 2500,
      weight: 0.3,
    },
    firstInputDelay: {
      threshold: 100,
      weight: 0.2,
    },
    cumulativeLayoutShift: {
      threshold: 0.1,
      weight: 0.2,
    },
  },
  budgets: {
    performance: 90,
    accessibility: 90,
    bestPractices: 90,
    seo: 90,
  },
  thresholds: {
    performance: 80,
    accessibility: 80,
    bestPractices: 80,
    seo: 80,
  },
  reports: {
    outputDir: 'performance-reports',
    format: 'html',
  },
};
