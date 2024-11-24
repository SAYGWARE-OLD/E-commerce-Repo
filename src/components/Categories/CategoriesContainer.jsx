/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { Col, message, Row } from "antd";
import Cart from "../Cart";
import CategoriesCompareModal from "./CategoriesCompareModal";
import Filter from "../../hooks/Filter";
import "./Categories.css";
import { CloseCircleOutlined } from "@ant-design/icons";

const CategoriesContainer = ({ title, products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [defaultFilterValues, setDefaultFilterValues] = useState({});
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });

  const calculateFilterValues = () =>
    products
      .map((item) => item.features)
      .reduce((acc, item) => {
        Object.entries(item).forEach(([key, value]) => {
          if (!acc[key]) acc[key] = [value, value];
          else {
            const minValue = acc[key][0];
            const maxValue = acc[key][1];
            if (value < minValue) acc[key][0] = value;
            if (value > maxValue) acc[key][1] = value;
          }
        });
        return acc;
      }, {});

  useEffect(() => {
    const filterValues = calculateFilterValues();
    setFilterValues(filterValues);
    setDefaultFilterValues(filterValues);
  }, []);

  const handleFilterChange = (feature, values) =>
    setFilterValues({
      ...filterValues,
      [feature]: values,
    });

  const filteredProducts = products
    .filter((product) => {
      const minPrice = priceRange.minPrice
        ? parseFloat(priceRange.minPrice)
        : 0;
      const maxPrice = priceRange.maxPrice
        ? parseFloat(priceRange.maxPrice)
        : Infinity;

      const isPriceInRange =
        product.price >= minPrice && product.price <= maxPrice;
      const areFeaturesInRange = Object.entries(filterValues).every(
        ([key, [min, max]]) =>
          product.features[key] >= min && product.features[key] <= max
      );

      return isPriceInRange && areFeaturesInRange;
    })
    .sort(
      (a, b) => b.features["Overall Rating"] - a.features["Overall Rating"]
    );

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, productId];
      } else {
        message.destroy();
        message.warning("En fazla 2 ürün seçebilirsiniz!", 2);
        return prevSelected;
      }
    });
  };

  return (
    <div className="category-wrapper">
      <CategoriesCompareModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        products={filteredProducts}
        selectedProducts={selectedProducts}
      />
      <h1 style={{ color: "white" }}>{title}</h1>
      <div className="content-wrapper">
        <Filter
          handleFilterChange={handleFilterChange}
          priceRange={priceRange}
          defaultFilterValues={defaultFilterValues}
          setPriceRange={setPriceRange}
        />
        <div className="products-container">
          <Row
            gutter={16}
            className="categories-card"
            style={{ marginRight: "0px" }}
          >
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8}>
                <Cart
                  id={product.id}
                  title={product.name}
                  description={product.description}
                  imageSrc={product.img}
                  price={product.price}
                  toggleProductSelection={toggleProductSelection}
                  product={product}
                  overallRating={product.features["Overall Rating"]}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="compare-container">
          <div className="compare-items">
            {selectedProducts.map((productId, index) => {
              const product = products.find((item) => item.id === productId);
              return (
                <React.Fragment key={product.id}>
                  <div className="product">
                    <CloseCircleOutlined
                      className="remove-icon"
                      onClick={() => toggleProductSelection(product.id)}
                    />
                    <img src={product.img} alt={product.name} />
                    <div className="product-name">{product.name}</div>
                  </div>
                  {index < selectedProducts.length - 1 && (
                    <div className="vs-icon">VS</div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesContainer;
