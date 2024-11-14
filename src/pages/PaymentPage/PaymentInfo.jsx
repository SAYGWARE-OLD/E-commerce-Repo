import React from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import { axiosInstance } from '../../network/axiosInstance';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import './PaymentStepper.css'

function PaymentInfo({ onFinish, setUserInfo, userInfo }) {
    const handlePost = () => {
        const postData = {
            address: userInfo.address,
            phoneNumber: userInfo.phoneNumber,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            cardNumber: userInfo.cardNumber,
            expirationDate: userInfo.expirationDate,
            cvv: userInfo.cvv,
            cardOwner: userInfo.cardOwner
        };

        axiosInstance.post('/myOrders', postData)
            .then((res) => {
                console.log(res.data);
                if (onFinish) {
                    onFinish();
                }
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\D/g, '').substring(0, 16);
        return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    };

    const handleCardNumberChange = (e) => {
        const rawValue = e.target.value;
        const formattedCardNumber = formatCardNumber(rawValue);
        setUserInfo({ ...userInfo, cardNumber: formattedCardNumber });
    };

    const monthFormat = 'MM/YYYY';
    const handleDateChange = (date) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, expirationDate: date ? date.format(monthFormat) : '' }));
    };

    return (
        <div className='asd'>
            <Form style={{ padding: "50px" }} onFinish={handlePost} layout='vertical'>
                <Form.Item
                    style={{ marginTop: "50px" }}
                    label="Card Owner"
                    name="cardName"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input style={{ width: "70%" }} onChange={(e) => setUserInfo({ ...userInfo, cardOwner: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label="Card Number"
                    name="cardNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your card number!'
                        },
                        {
                            pattern: /^(\d{4} ){3}\d{4}$/,
                            message: 'Please enter a valid card number format!'
                        }
                    ]}
                >
                    <Input
                        onChange={handleCardNumberChange}
                        value={userInfo.cardNumber}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        style={{ width: "160px" }}
                    />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Expiration Date"
                            name="expirationDate"
                            rules={[{ required: true, message: 'Please enter the expiration date!' }]}
                        >
                            <DatePicker
                                defaultValue={dayjs('01/2015', monthFormat)}
                                format={monthFormat}
                                picker="month"
                                onChange={handleDateChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="CVV"
                            name="cvv"
                            rules={[{ required: true, message: 'Please enter your CVV number!' }]}
                        >
                            <Input style={{ width: "50%" }} onChange={(e) => setUserInfo({ ...userInfo, cvv: e.target.value })} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                    <Button className='continue-button' type="primary" htmlType="submit">
                        Pay
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PaymentInfo;