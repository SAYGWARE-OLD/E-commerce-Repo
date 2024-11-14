import { Col, Row, Card, Typography  } from "antd";
import "./HomeForm.css";
import { categories } from "../../../../mock/categories";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const { Text } = Typography;
const texts = ["CPU...", "GPU...", "RAM...", "SSD..."];

function CategoryCard({ name, id, img }) {
  return (
    <>
    <Link to={`categories/${id}`}>
      <Card
        className="category-card"
        style={{
          backgroundImage: `url(${img})`,
          color: "#fff",
        }}
      >
        <Text className="category-text">{name}</Text>
      </Card>
    </Link>
    </>
  );
}

function HomeForm() {

  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(texts[index]);
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Adjust time for each text display
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="page-container">
      <div className="main-title">
        <h1>WHICH ONE IS THE BEST? <br/> <span className="fancy">{currentText}</span></h1>
      </div>  
      <div className="categories-wrapper">
      <Row gutter={[24, 24]}>
        {categories.map((category) => (
          <Col span={12} key={category.id}>
            <CategoryCard name={category.name} id={category.id} img={category.img}/>
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
}

export default HomeForm;
