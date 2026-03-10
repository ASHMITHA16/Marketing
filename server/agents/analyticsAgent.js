const analyticsAgent = ({ impressions, clicks, conversions, spend, revenue }) => {

  const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : 0;

  const conversionRate = clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : 0;

  const performanceScore =
    (Number(ctr) * 0.5 + Number(conversionRate) * 0.5).toFixed(2);

  return {
    impressions,
    clicks,
    conversions,
    ctr,
    conversionRate,
    spend,
    revenue,
    performanceScore
  };

};

export default analyticsAgent;