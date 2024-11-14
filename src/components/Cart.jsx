import { useState } from 'react';
import { MdFavoriteBorder } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { Button, Card, notification } from 'antd';
import Meta from 'antd/es/card/Meta';
import './Cart.css';
import { useCart, useFavori } from '../utils/CartContext';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, SwapOutlined } from '@ant-design/icons';

function Cart({ id, imageSrc, title, description, price, toggleProductSelection, product }) {
    const navigate = useNavigate();
    const { addToCart, removeFromCart, cartItems } = useCart();
    const { addToFavori, removeFromFavori, favoriItems } = useFavori();
    const [isInCart, setIsInCart] = useState(cartItems.some(item => item.id === id));
    const [isFavori, setIsFavori] = useState(favoriItems.some(item => item.id === id));

    const handleAddToCart = () => {
        const item = { id, imageSrc, title, description, price };
        if (isInCart) {
            const itemIndex = cartItems.findIndex(item => item.id === id);
            removeFromCart(itemIndex);
            notification.success({
                message: 'Removed from cart',
                placement: 'topRight',
                duration: 3,
            });
        } else {
            addToCart(item);
            notification.success({
                message: 'Added to cart',
                placement: 'topRight',
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
                message: 'Removed from favorites',
                placement: 'topRight',
                duration: 3,
            });
        } else {
            addToFavori(item);
            notification.success({
                message: 'Added to favorites',
                placement: 'topRight',
                duration: 3,
            });
        }
        setIsFavori(!isFavori);
    };

    const handleNavigateCart = () => {
        navigate(`/detail/${id}`);
    };

    return (
        <Card
            hoverable
            style={{ width: '100%' }}
            cover={<img alt={title} src={imageSrc} />}
            className="card-container"
        >
            <div className="card-content">
                <Meta title={title} description={description} />
                <p className="price">Price: {price} ₺</p>
                <div className='button-container'>
                    <Button
                        className={`favorite-button ${isFavori ? 'in-favori' : ''}`}
                        onClick={handleAddToFavori}
                    >
                        <MdFavoriteBorder />
                        Favorite 
                    </Button>
                    <Button
                        className={`basket-button ${isInCart ? 'in-cart' : ''}`}
                        onClick={handleAddToCart}
                    >
                        <FaShoppingBasket />
                        Add to Cart
                    </Button>
                    <Button className='review-button' onClick={handleNavigateCart}>
                        <EyeOutlined />
                        Review
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => toggleProductSelection(product)}
                        style={{ marginTop: "10px" }}
                        className='compare-button'
                        >
                        <SwapOutlined />    
                        Compare
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default Cart;