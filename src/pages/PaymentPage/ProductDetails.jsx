import React from 'react';
import { useCart } from '../../utils/CartContext';
import { Button, List } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ onFinish, initialValues }) => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const totalPrice = calculateTotalPrice();

    const handleNext = () => {
        onFinish(initialValues);
    };

    return (
        <div className="product-details-container">
            <div className="product-list-container">
                <List
                    itemLayout="vertical"
                    dataSource={cartItems}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<img alt={item.title} src={item.imageSrc} style={{ width: 50 }} />}
                                title={item.title}
                            />
                            <div>Price: {item.price} ₺</div>
                        </List.Item>
                    )}
                />
            </div>
            <h3 style={{ display: "flex", justifyContent: "center" }}>Total Price: {totalPrice} ₺</h3>
        </div>
    );
}

export default ProductDetails;