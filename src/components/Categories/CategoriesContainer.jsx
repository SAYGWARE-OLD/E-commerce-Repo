/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import Cart from "../Cart";
import { CloseCircleOutlined } from "@ant-design/icons";
import CategoriesCompareModal from "./CategoriesCompareModal";
import Filter from "../../hooks/Filter";

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

  const toggleProductSelection = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.find((p) => p.id === product.id)) {
        return prevSelected.filter((p) => p.id !== product.id);
      } else {
        return [...prevSelected, product];
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
            {selectedProducts.map((product) => (
              <div className="product" key={product.id}>
                <CloseCircleOutlined
                  className="remove-icon"
                  onClick={() => toggleProductSelection(product)}
                />
                <img
                  src={product.img}
                  alt={product.name}
                  className="product-img"
                />
                <p>{product.name}</p>
              </div>
            ))}
            {selectedProducts.length > 1 && (
              <Button
                style={{ marginBottom: "20px" }}
                onClick={() => setIsModalOpen(true)}
              >
                Compare
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesContainer;
