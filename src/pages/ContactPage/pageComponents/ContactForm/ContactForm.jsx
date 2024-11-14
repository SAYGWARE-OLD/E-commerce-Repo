import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import "../../Contact.css";

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Select.Option value="86">+86</Select.Option>
            <Select.Option value="87">+87</Select.Option>
            <Select.Option value="90">+90</Select.Option>
        </Select>
    </Form.Item>
);

const ContactForm = ({ onFinish }) => (
    <div className="contact-container">
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            validateMessages={validateMessages}
        >
            <Form.Item
                name={['user', 'name']}
                label="Name"
                rules={[{ required: true }]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[{ type: 'email' }]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea
                    style={{ height: '100px' }}
                    placeholder="Contact us"
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 0,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
);

export default ContactForm;