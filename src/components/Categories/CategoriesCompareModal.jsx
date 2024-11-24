import { Col, Modal, Row } from "antd";
import RadarChart from "../RadarChart";
import FeaturesCompare from "../FeaturesCompare";

const CategoriesCompareModal = ({
  isModalOpen,
  setIsModalOpen,
  products,
  selectedProducts,
  filterValues,
}) => {
  return (
    <Modal
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          COMPARE
        </div>
      }
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
              selectedProducts={selectedProducts}
              filterValues={filterValues}
            />
          </Col>

          <Col span={12}>
            <FeaturesCompare
              products={products}
              selectedProducts={selectedProducts}
            />
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default CategoriesCompareModal;
