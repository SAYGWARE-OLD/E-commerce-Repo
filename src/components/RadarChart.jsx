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

const RadarChart = ({ products, selectedProducts, filterValues }) => {
  const data = {
    labels: Object.keys(filterValues),
    datasets: products
      .filter((p) => selectedProducts.includes(p.id))
      .map((product, index) => ({
        label: product.name,
        data: Object.values(product.features),
        backgroundColor:
          index % 2 ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 0, 255, 0.2)",
        borderColor: index % 2 ? "rgb(255, 0, 0)" : "rgb(0, 0, 255)",
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
