  import { useState } from "react";
  import { useParams } from "react-router-dom";
  import {  Col, Row } from "antd";
  import Cart from "../../components/Cart";
  import { categoryProducts } from "../../mock/categoryProducts";
  import { categories } from "../../mock/categories";
  import RadarChart from "../../components/RadarChart";
  import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";

  const CategoriesContainer = () => {
    const { id } = useParams();
    const category = categories.find((category) => category.id === Number(id));
    const products = categoryProducts[id];

    const [selectedProducts, setSelectedProducts] = useState([]);

    const toggleProductSelection = (product) => {
      setSelectedProducts((prevSelected) => {
        if (prevSelected.find((p) => p.id === product.id)) {
          return prevSelected.filter((p) => p.id !== product.id);
        } else if (prevSelected.length < 2) {
          return [...prevSelected, product];
        } else {
          alert("Sadece 2 ürün seçebilirsiniz!");
          return prevSelected;
        }
      });
    };

    const normalizePrice = (price, maxPrice) => (1 - price / maxPrice) * 100;
    const normalizeBench = (bench, maxBench) => (bench / maxBench) * 100;
    const normalizeAge = (age, maxAge) => (1 - age / maxAge) * 100;

    const maxPrice = Math.max(...products.map(p => p.specs.price));
    const maxBench = Math.max(...products.map(p => p.specs.avgBench));
    const maxAge = Math.max(...products.map(p => p.specs.ageMonths));

    const normalizedProducts = selectedProducts.map((product) => {
      const normalizedSpecs = {
        price: normalizePrice(product.specs.price, maxPrice),
        avgBench: normalizeBench(product.specs.avgBench, maxBench),
        ageMonths: normalizeAge(product.specs.ageMonths, maxAge),
      };

      const overallScore = Object.values(normalizedSpecs).reduce((sum, value) => sum + value, 0) / Object.keys(normalizedSpecs).length;

      return { ...product, normalizedSpecs, overallScore };
    });

    // Dinamik olarak özellikleri belirleme
    const categoryFeatures = selectedProducts.length === 2 ? Object.keys(selectedProducts[0].specs) : [];

    return (
      <div className="category-wrapper">
        <h1>{category.name}</h1>

        <Row gutter={16} className="categories-card" style={{ marginRight: "0px" }}>
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

        {selectedProducts.length === 2 && (
          <RadarChart products={normalizedProducts} features={categoryFeatures} />
        )}
       {selectedProducts.length > 0 && (
       <div className="compare-container">
         <div className="compare-items">
           {selectedProducts.map((product, index) => (
             <div className="product" key={product.id}>
              <CloseCircleOutlined className="remove-icon" onClick={() => toggleProductSelection(product)}/> 
               <img src={product.img} alt={product.name} className="product-img" />
               <p>{product.name}</p>
     
               {index === 0 && selectedProducts.length === 2 && (
                 <div className="vs-icon">VS</div>
               )}
             </div>
           ))}
         </div>
     </div>
       )}
    </div>
  );
};

  export default CategoriesContainer;
