import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { Button, Card, notification, Tooltip, Switch } from "antd";
import Meta from "antd/es/card/Meta";
import "./Cart.css";
import { useCart, useFavori } from "../utils/CartContext";
import { useNavigate } from "react-router-dom";
import {
  BuildOutlined,
  CustomerServiceOutlined,
  FormatPainterOutlined,
  HeartTwoTone,
  PoweroffOutlined,
  SmileOutlined,
  SwapOutlined,
} from "@ant-design/icons";

function Cart({
  id,
  imageSrc,
  title,
  description,
  price,
  toggleProductSelection,
  product,
  overallRating,
}) {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { addToFavori, removeFromFavori, favoriItems } = useFavori();
  const [isInCart, setIsInCart] = useState(
    cartItems.some((item) => item.id === id)
  );
  const [isFavori, setIsFavori] = useState(
    favoriItems.some((item) => item.id === id)
  );
  const [isFlipped, setIsFlipped] = useState(false);

  const handleAddToCart = () => {
    const item = { id, imageSrc, title, description, price };
    if (isInCart) {
      const itemIndex = cartItems.findIndex((item) => item.id === id);
      removeFromCart(itemIndex);
      notification.success({
        message: "Removed from cart",
        placement: "topRight",
        duration: 3,
      });
    } else {
      addToCart(item);
      notification.success({
        message: "Added to cart",
        placement: "topRight",
        duration: 3,
      });
    }
    setIsInCart(!isInCart);
  };

  const handleAddToFavori = () => {
    const item = { id, imageSrc, title, description, price };
    if (isFavori) {
      removeFromFavori(id);
      notification.success({
        message: "Removed from favorites",
        placement: "topRight",
        duration: 3,
      });
    } else {
      addToFavori(item);
      notification.success({
        message: "Added to favorites",
        placement: "topRight",
        duration: 3,
      });
    }
    setIsFavori(!isFavori);
  };

  const handleNavigateCart = () => {
    navigate(`/detail/${id}`);
  };

  const handleFlip = (checked) => {
    setIsFlipped(checked);
  };

  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={
        <img
          alt={title}
          src={imageSrc}
          style={{
            objectFit: "contain",
            width: "50%",
            margin: "0 auto",
          }}
          onClick={handleNavigateCart}
        />
      }
      className={`card-container ${isFlipped ? "flipped" : ""}`}
    >
      <div className="card-inner">
        <div className="card-front">
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              backgroundColor: "#3c59fc",
              color: "white",
              fontWeight: "bold",
              borderRadius: 100,
              width: 60,
              height: 60,
              fontSize: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {overallRating}
          </div>
          <Meta title={title} description={description} />
          <p className="price">Price: {price} ₺</p>
          <div className="button-container">
            <Button className="favorite-button" onClick={handleAddToFavori}>
              <HeartTwoTone
                twoToneColor={isFavori ? "#ff0000" : "#d9d9d9"}
                style={{
                  fontSize: "24px",
                  color: isFavori ? "#ff0000" : "#d9d9d9",
                }}
              />
            </Button>
            <Button
              className={`basket-button ${isInCart ? "in-cart" : ""}`}
              onClick={handleAddToCart}
            >
              <FaShoppingBasket />
              Add to Cart
            </Button>
          </div>
          <div>
            <Button
              onClick={() => toggleProductSelection(product)}
              style={{ marginTop: "10px" }}
              className="compare-button"
            >
              <SwapOutlined />
              Compare
            </Button>
          </div>
          <div style={{ marginTop: "10px", zIndex:"9999"  }}>
            <Switch
              checked={isFlipped}
              onChange={handleFlip}
              checkedChildren="Details"
              unCheckedChildren="Info"
            />
          </div>
        </div>
        <div className="card-back">
          <h1 className="features-title">Features</h1>
          <div className="features">
            <div className="features-item">
              <Tooltip title="Build Quality">
                <i>
                  <BuildOutlined />
                </i>
              </Tooltip>
              <p>{product.features.buildQuality}</p>
            </div>
            <div className="features-item">
              <Tooltip title="Sound Quality">
                <i>
                  <CustomerServiceOutlined />
                </i>
              </Tooltip>
              <p>{product.features.soundQuality}</p>
            </div>
            <div className="features-item">
              <Tooltip title="Design">
                <i>
                  <FormatPainterOutlined />
                </i>
              </Tooltip>
              <p>{product.features.design}</p>
            </div>
            <div className="features-item">
              <Tooltip title="Comfort">
                <i>
                  <SmileOutlined />
                </i>
              </Tooltip>
              <p>{product.features.comfort}</p>
            </div>
            <div className="features-item">
              <Tooltip title="Battery">
                <i>
                  <PoweroffOutlined />
                </i>
              </Tooltip>
              <p>{product.features.batteryLife}</p>
            </div>
          </div>
          <div style={{ marginTop: "50px", zIndex:"9999" }}>
            <Switch
              checked={isFlipped}
              onChange={handleFlip}
              checkedChildren="Details"
              unCheckedChildren="Info"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Cart;
