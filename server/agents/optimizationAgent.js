const optimizationAgent = (metrics) => {
  const suggestions = [];

  if (metrics.ctr < 2) {
    suggestions.push("Improve ad creatives to increase CTR.");
  }

  if (metrics.conversionRate < 5) {
    suggestions.push("Optimize landing page for better conversions.");
  }

  if (metrics.cac > 50) {
    suggestions.push("Reduce budget on low-performing platforms.");
  }

  if (metrics.roi < 0) {
    suggestions.push("Shift budget to higher ROI channels.");
  }

  return suggestions;
};

export default optimizationAgent;