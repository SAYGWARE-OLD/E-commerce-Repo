import React from 'react';
import { Form, Input } from 'antd';

const ConfirmPassword = () => {
    return (

        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The passwords that you entered do not match!'));
                    },
                }),
            ]}
            className="register-form-item"
            style={{ width: '100%' }}
        >
            <Input.Password style={{ width: '100%' }} />
        </Form.Item>
    )
}
export default ConfirmPassword