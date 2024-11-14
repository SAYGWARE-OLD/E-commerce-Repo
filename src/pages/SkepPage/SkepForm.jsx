import React from 'react';
import { useCart } from '../../utils/CartContext';
import { Card, Row, Col, Button, notification } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FaTrash } from 'react-icons/fa';
import './Skep.css';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '../../routing/routes';
import { ROUTES_ID } from '../../routing/routes_id';

const SkepForm = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const totalPrice = calculateTotalPrice();

    const handleRemove = (index) => {
        removeFromCart(index);
        notification.success({
            message: 'Card removed',
            description: '',
            placement: 'topRight',
            duration: 3,
        });
    };

    const handlePay = () => {
        navigate(getRoutePath(ROUTES_ID.payment));
    }

    return (
        <div className="skep-container">
            {cartItems.length > 0 ? (
                <>
                    <Row gutter={16}>
                        {cartItems.map((item, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6} className="card-col">
                                <Card
                                    hoverable
                                    cover={<img alt={item.title} src={item.imageSrc} />}
                                    className="card-container"
                                >
                                    <div className="card-content">
                                        <Meta title={item.title} description={item.description} />
                                        <p className="price">Price: {item.price} ₺</p>
                                        <Button
                                            className='remove-button'
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove <FaTrash />
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className='total-price'>
                        <div className="total-price-container">
                            <h3>Total Price: {totalPrice} TL</h3>
                            <Button className='pay-button' onClick={handlePay}>Pay</Button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default SkepForm;