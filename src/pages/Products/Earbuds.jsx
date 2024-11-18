import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Col, Modal, Row } from "antd";
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
                products={products}
                features={Object.keys(selectedProducts[0].specs)}
              />
            </Col>
            <Col span={12}>ASDASIUDAIUDA</Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

const CategoriesContainer = ({ title }) => {
  const products = earbuds.sort(
    (a, b) => b.features.overallRating - a.features.overallRating
  );

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

      <h1 style={{ color: "white" }}>{title}</h1>

      <Row
        gutter={16}
        className="categories-card"
        style={{ marginRight: "0px" }}
      >
        {products.map((product) => (
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
