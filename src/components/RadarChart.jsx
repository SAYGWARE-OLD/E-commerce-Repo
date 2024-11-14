/* eslint-disable react/prop-types */
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ products, features }) => {
  const data = {
    labels: features,
    datasets: [
      {
        label: products[0].name,
        data: features.map((feature) => products[0].normalizedSpecs[feature] || 0), // İlk ürün normalize edilmiş özellik değerleri
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: products[1].name,
        data: features.map((feature) => products[1].normalizedSpecs[feature] || 0), // İkinci ürün normalize edilmiş özellik değerleri
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
      <Radar data={data} options={options} width={300} height={300} />
    </div>
  );
};

export default RadarChart;
