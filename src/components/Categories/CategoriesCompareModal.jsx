import { Col, Modal, Row } from "antd";
import RadarChart from "../RadarChart";

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

  export default CategoriesCompareModal;