import { useParams } from "react-router-dom";
import { earbuds } from "../../mock/earbuds";
import "./style.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const categories = {
  earbuds,
};

const ProductDetail = () => {
  const { category, id } = useParams();
  const categoryProducts = categories[category];

  if (!categoryProducts) {
    return <div className="error">Category not found</div>;
  }

  const product = categoryProducts.find((item) => item.id === Number(id));

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  const renderProductFeatures = () => {
    return Object.entries(product.features).map(([key, value]) => (
      <tr key={key}>
        <td className="feature-key">{key}</td>
        <td className="feature-value">{value}</td>
      </tr>
    ));
  };


  return (
    <div className="product-detail">
      <div className="product-card">
        <div className="product-card-left">
          <img
            src={`${product.img}`}
            alt={product.name}
            className="product-image"
          />
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}₺</p>
          <div className="roll-back" onClick={() => window.history.back()}>
            <ArrowLeftOutlined />
            Go Back
          </div>
          <div className="overall-rating">
            {product.overallRating}
          </div>
        </div>

        <div className="product-info">
          <table className="product-features">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{renderProductFeatures()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
