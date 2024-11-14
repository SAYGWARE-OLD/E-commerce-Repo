import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Col, Modal, Row } from "antd";
import Cart from "../../components/Cart";
import { categoryProducts } from "../../mock/categoryProducts";
import { categories } from "../../mock/categories";
import RadarChart from "../../components/RadarChart";
import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import MainLayout from "../../layout/MainLayoutPage/MainLayout";
import { getRouteTitle } from "../../routing/routes";
import Navbar from "../../components/navbar";

const CategoriesCompareModal = ({
  isModalOpen,
  setIsModalOpen,
  products,
  selectedProducts,
}) => {
  const normalizePrice = (price, maxPrice) => (1 - price / maxPrice) * 100;
  const normalizeBench = (bench, maxBench) => (bench / maxBench) * 100;
  const normalizeAge = (age, maxAge) => (1 - age / maxAge) * 100;

  const maxPrice = Math.max(...products.map((p) => p.specs.price));
  const maxBench = Math.max(...products.map((p) => p.specs.avgBench));
  const maxAge = Math.max(...products.map((p) => p.specs.ageMonths));

  const normalizedProducts = selectedProducts.map((product) => {
    const normalizedSpecs = {
      price: normalizePrice(product.specs.price, maxPrice),
      avgBench: normalizeBench(product.specs.avgBench, maxBench),
      ageMonths: normalizeAge(product.specs.ageMonths, maxAge),
    };

    const overallScore =
      Object.values(normalizedSpecs).reduce((sum, value) => sum + value, 0) /
      Object.keys(normalizedSpecs).length;

    return { ...product, normalizedSpecs, overallScore };
  });

  return (
    <>
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
                products={normalizedProducts}
                features={Object.keys(selectedProducts[0].specs)}
              />
            </Col>
            <Col span={12}>
              ASDASIUDAIUDA
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

const CategoriesContainer = () => {
  const { id } = useParams();
  const category = categories.find((category) => category.id === Number(id));
  const products = categoryProducts[id];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);

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
        products={products}
        selectedProducts={selectedProducts}
      />

      <h1 style={{color: "white"}}>{category.name}</h1>

      <Row
        gutter={16}
        className="categories-card"
        style={{ marginRight: "0px" }}
      >
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8}>
            <Cart
              id={product.id}
              title={product.name}
              description={product.description}
              imageSrc={product.img}
              price={product.specs.price}
              toggleProductSelection={toggleProductSelection}
              product={product}
            />
          </Col>
        ))}
      </Row>

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

function Categories() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  return (
    <MainLayout
      content={<CategoriesContainer />}
      header={<Navbar />}
      title={title}
    />
  );
}

export default Categories;
