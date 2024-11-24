import { CheckOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { useState } from "react";

const FeaturesCompare = ({ products, selectedProducts }) => {
  const [activeKey, setActiveKey] = useState(0);
  const filteredProducts = products.filter((product) =>
    selectedProducts.includes(product.id)
  );
  const otherProduct = filteredProducts[activeKey === 0 ? 1 : 0];

  const betterFeatures = Object.entries(
    filteredProducts[activeKey].features
  ).filter(([key, value]) => {
    if (value > otherProduct.features[key]) return true;
  });

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        centered
        items={filteredProducts.map((product, i) => ({
          label: product.name,
          key: i,
        }))}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {betterFeatures.length ? (
          betterFeatures.map(([key, value], i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: "1.2rem",
                  display: "flex",
                  gap: "6px",
                }}
              >
                <CheckOutlined />
                {((value - otherProduct.features[key]) * 10).toFixed(0)}% better
                <span
                  style={{
                    fontWeight: "600",
                    marginRight: "3px",
                  }}
                >
                  {key}
                </span>
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    color: activeKey ? "red" : "blue",
                  }}
                >
                  {filteredProducts[activeKey].features[key]}
                </span>{" "}
                vs{" "}
                <span
                  style={{
                    color: activeKey ? "blue" : "red",
                  }}
                >
                  {otherProduct.features[key]}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>No better features</div>
        )}
      </div>
    </div>
  );
};

export default FeaturesCompare;
