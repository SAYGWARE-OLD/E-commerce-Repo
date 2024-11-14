import React from 'react';
import { Form, Input } from 'antd';

const PasswordInput = ({ value, onChange, prefix, name, label }) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[
                {
                    required: true,
                    message: 'Please input your new password!',
                },
                {
                    validator(_, value) {
                        if (value && (
                            value.length < 8 ||
                            !/[a-z]/.test(value) ||
                            !/[A-Z]/.test(value) ||
                            !/\d/.test(value) ||
                            !/[!@#$%^&*(),.?":{}|<>]/.test(value)
                        )) {
                            return Promise.reject(new Error(
                                `Password must be ${value.length < 8 ? 'at least 8 characters long' : !/[a-z]/.test(value) ? 'contain at least one lowercase letter' : !/[A-Z]/.test(value) ? 'one uppercase letter' : !/\d/.test(value) ? 'one number' : !/[!@#$%^&*(),.?":{}|<>]/.test(value) ? 'one special character!' : null} `
                            ));
                        }
                        return Promise.resolve();
                    },
                },
            ]}
            hasFeedback
        >
            <Input.Password value={value} onChange={onChange} prefix={prefix} />
        </Form.Item>
    )
}
export default PasswordInput