import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ products, features }) => {
  const data = {
    labels: features,
    datasets: products.map((product) => ({
      label: product.name,
      data: features.map((feature) => product.normalizedSpecs[feature] || 0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1,
    })),
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
