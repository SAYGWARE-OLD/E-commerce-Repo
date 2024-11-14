import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import Meta from 'antd/es/card/Meta';
import './Favorite.css';
import { FaTrash } from 'react-icons/fa';
import { notification } from 'antd';
import { useFavori } from '../../utils/CartContext';

const FavoriForm = () => {
    const { favoriItems, removeFromFavori } = useFavori();

    const handleRemove = (id) => {
        removeFromFavori(id);
        notification.success({
            message: 'Removed from favorites',
            description: '',
            placement: 'topRight',
            duration: 3,
        });
    };

    return (
        <div className="favori-container">
            {favoriItems.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {favoriItems.map(item => (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
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
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Remove <FaTrash />
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Your favorites list is empty.</p>
            )}
        </div>
    );
};

export default FavoriForm;