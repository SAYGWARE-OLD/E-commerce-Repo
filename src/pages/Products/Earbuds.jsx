import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Col, Modal, Row, Slider, Input } from "antd";
import Cart from "../../components/Cart";
import RadarChart from "../../components/RadarChart";
import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import { getRouteTitle } from "../../routing/routes";
import Navbar from "../../components/navbar";
import { earbuds } from "../../mock/earbuds";

const CategoriesCompareModal = ({
  isModalOpen,
  setIsModalOpen,
  products,
  selectedProducts,
}) => {
  return (
    <Modal
      title="Compare Products"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      width={"80vw"}
    >
      {selectedProducts.length > 1 && (
        <Row>
          <Col span={12}>
            <RadarChart
              products={products}
              features={Object.keys(selectedProducts[0].specs)}
            />
          </Col>
          <Col span={12}>Comparison Chart</Col>
        </Row>
      )}
    </Modal>
  );
};

const CategoriesContainer = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterValues, setFilterValues] = useState({
    buildQuality: [0, 10],
    soundQuality: [0, 10],
    design: [0, 10],
    comfort: [0, 10],
    batteryLife: [0, 10],
  });
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });

  const handleFilterChange = (feature, values) => {
    setFilterValues((prev) => ({ ...prev, [feature]: values }));
  };

  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = earbuds
    .filter((product) => {
      const minPrice = priceRange.minPrice ? parseFloat(priceRange.minPrice) : 0;
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
        <div className="sidebar">
          <h3>Filters</h3>
          {[{ key: "buildQuality", label: "Build Quality" },
            { key: "soundQuality", label: "Sound Quality" },
            { key: "design", label: "Design" },
            { key: "comfort", label: "Comfort" },
            { key: "batteryLife", label: "Battery Life" },
          ].map(({ key, label }) => (
            <div key={key}>
              <h4>{label}</h4>
              <Slider
                range
                min={0}
                max={10}
                defaultValue={filterValues[key]}
                onChange={(values) => handleFilterChange(key, values)}
              />
            </div>
          ))}
          <h3>Price Range</h3>
          <div className="price-range">
            <Input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={priceRange.minPrice}
              onChange={handlePriceInputChange}
            />
            {"-"}
            <Input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={priceRange.maxPrice}
              onChange={handlePriceInputChange}
            />
          </div>
        </div>

        <div className="products-container">
          <Row
            gutter={16}
            className="categories-card"
            style={{ marginRight: "0px" }}
          >
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

function Earbuds() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  return (
    <MainLayout
      content={<CategoriesContainer title={title} />}
      header={<Navbar />}
      title={title}
    />
  );
}

export default Earbuds;
