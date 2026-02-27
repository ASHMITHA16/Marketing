export const analyticsAgent= (data) => {
  const {
    impressions = 0,
    clicks = 0,
    conversions = 0,
    spend = 0,
    revenue = 0,
  } = data;

  const ctr =
    impressions === 0 ? 0 : (clicks / impressions) * 100;

  const conversionRate =
    clicks === 0 ? 0 : (conversions / clicks) * 100;

  const cac =
    conversions === 0 ? 0 : spend / conversions;

  const roi =
    spend === 0 ? 0 : ((revenue - spend) / spend) * 100;

  return {
    ctr: ctr.toFixed(2),
    conversionRate: conversionRate.toFixed(2),
    cac: cac.toFixed(2),
    roi: roi.toFixed(2),
  };
};