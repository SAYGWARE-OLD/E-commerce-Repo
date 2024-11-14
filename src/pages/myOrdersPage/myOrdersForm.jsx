import React from 'react';
import { useCart } from '../../utils/CartContext';
import { List } from 'antd';

const MyOrdersForm = () => {
    const { cartItems } = useCart();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const totalPrice = calculateTotalPrice();

    return (
        <div className="my-orders-container">
            <h2 style={{ display: "flex", justifyContent: "center" }}>My Orders</h2>
            <h3 style={{ display: "flex", justifyContent: "center" }}>Total Price: {totalPrice} TL</h3>

            <div className="order-list-container">
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
        </div>
    );
}

export default MyOrdersForm;