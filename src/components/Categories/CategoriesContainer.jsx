/* eslint-disable react/jsx-no-duplicate-props */
import { useState } from "react";
import { earbuds } from "../../mock/earbuds";
import { Button, Col, Row } from "antd";
import Cart from "../Cart";
import { CloseCircleOutlined } from "@ant-design/icons";
import CategoriesCompareModal from "./CategoriesCompareModal";
import Filter from "../../hooks/Filter";

const CategoriesContainer = ({ title, categoryFilters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filterValues, setFilterValues] = useState(
      categoryFilters.reduce((acc, filter) => {
        acc[filter.key] = [0, 10];  
        return acc;
      }, {})
    );
    const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  
    const handleFilterChange = (feature, values) => {
      setFilterValues((prev) => ({ ...prev, [feature]: values }));
    };
  
    const filteredProducts = earbuds
      .filter((product) => {
        const minPrice = priceRange.minPrice ? parseFloat(priceRange.minPrice) : 0;
        const maxPrice = priceRange.maxPrice ? parseFloat(priceRange.maxPrice) : Infinity;
  
        const isPriceInRange = product.price >= minPrice && product.price <= maxPrice;
        const areFeaturesInRange = Object.entries(filterValues).every(
          ([key, [min, max]]) => product.features[key] >= min && product.features[key] <= max
        );
  
        return isPriceInRange && areFeaturesInRange;
      })
      .sort((a, b) => b.features.overallRating - a.features.overallRating);
  
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
            filterValues={filterValues}
            setPriceRange={setPriceRange}
            filters={categoryFilters} 
          />
          <div className="products-container">
            <Row gutter={16} className="categories-card" style={{ marginRight: "0px" }}>
              {filteredProducts.map((product) => (
                <Col key={product.id} xs={24} sm={12} md={6}>
                  <Cart
                    id={product.id}
                    title={product.name}
                    description={product.description}
                    imageSrc={product.img}
                    price={product.price}
                    toggleProductSelection={toggleProductSelection}
                    product={product}
                    overallRating={product.features.overallRating}
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
                  <img src={product.img} alt={product.name} className="product-img" />
                  <p>{product.name}</p>
                </div>
              ))}
              {selectedProducts.length > 1 && (
                <Button style={{ marginBottom: "20px" }} onClick={() => setIsModalOpen(true)}>
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
