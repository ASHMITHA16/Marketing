import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

/* Register chart components (FIXES CATEGORY SCALE ERROR) */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsChart = ({ impressions, clicks, conversions }) => {

  const data = {
    labels: ["Impressions", "Clicks", "Conversions"],
    datasets: [
      {
        label: "Campaign Performance",
        data: [impressions, clicks, conversions],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Campaign Growth"
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default AnalyticsChart;