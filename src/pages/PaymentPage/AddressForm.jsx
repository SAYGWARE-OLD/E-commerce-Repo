import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useAuth } from '../../utils/AuthContext';
import { fetchUserAttributes } from 'aws-amplify/auth';
import "./PaymentStepper.css";

function AddressForm({ onFinish, initialValues, setUserInfo, userInfo }) {
    const { isAuthenticated, isLoading } = useAuth();
    const [form] = Form.useForm();
    const [email, setEmail] = useState(userInfo.email || '');

    useEffect(() => {
        const loadUserEmail = async () => {
            if (isAuthenticated) {
                try {
                    const attributes = await fetchUserAttributes();
                    const userEmail = attributes.email || '';
                    setEmail(userEmail);
                    form.setFieldsValue({ email: userEmail });
                    setUserInfo((prev) => ({ ...prev, email: userEmail }));
                } catch (error) {
                    console.log('Error fetching user email:', error);
                }
            }
        };

        loadUserEmail();
    }, [isAuthenticated, form, setUserInfo]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            initialValues={{ ...initialValues, email }}
            className="address-form"
        >
            <Row gutter={16} style={{ marginTop: "7%" }}>
                <Col span={12}>
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[{ required: true, message: 'Please enter your first name!' }]}
                    >
                        <Input onChange={(e) => setUserInfo({ ...userInfo, firstname: e.target.value })} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[{ required: true, message: 'Please enter your last name!' }]}
                    >
                        <Input onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "7%" }}>
                <Col span={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
                    >
                        <Input
                            value={email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            disabled
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter your phone number!' }]}
                    >
                        <Input
                            style={{ width: "90%" }}
                            onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please enter your address!' }]}
            >
                <Input.TextArea
                    style={{ width: "100%" }}
                    rows={5}
                    onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                <Button className='continue-button' type="primary" htmlType="submit">
                    Continue
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddressForm;