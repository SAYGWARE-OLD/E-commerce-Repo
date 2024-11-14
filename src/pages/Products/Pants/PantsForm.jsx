import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { axiosInstance } from '../../../network/axiosInstance';
import Cart from '../../../components/Cart';
import '../Products.css'

function PantForm() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance.get('/products')
            .then((res) => {
                const filteredProducts = res.data.filter(product => product.type === 'pant');
                setProducts(filteredProducts);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="page-container">
            <Row gutter={16} style={{ marginRight: "0px" }}>
                {products.map((e) => (
                    <Col key={e.id} xs={24} sm={12} md={8} lg={6} >
                        <Cart
                            id={e.id}
                            title={e.name}
                            description={e.description}
                            imageSrc={e.image}
                            price={e.price}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default PantForm;