import React from 'react';
import { Form, Input } from 'antd';

const EmailInput = ({ value, onChange, prefix }) => {
    return (
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input value={value} onChange={onChange} prefix={prefix} />
        </Form.Item>
    );
};

export default EmailInput;
