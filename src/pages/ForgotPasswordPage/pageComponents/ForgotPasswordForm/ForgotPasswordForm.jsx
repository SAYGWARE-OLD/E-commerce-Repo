import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../ForgotPassword.css';
import handleResetPassword from '../../../../utils/forgotResetPassword';
import EmailInput from '../../../../components/EmailInput';

function ForgotPasswordForm({ onFinish, initialValues }) {
    const [email, setEmail] = useState(initialValues?.email || '');
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        const success = await handleResetPassword(values.email);
        if (success) {
            onFinish(values);
        } else {
            console.log('Failed to send reset code.');
        }
    };

    return (
        <Form
            name="forgot_password"
            onFinish={handleFinish}
            layout='vertical'
            initialValues={{ email }}
        >
            <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className
            />
            <Form.Item>
                <div className='forgotPasswordButton'>
                    <Button className='send-button' type="primary" htmlType="submit">
                        Send Code
                    </Button>
                    <a className='loginB' href="/login">Go Login</a>
                </div>
            </Form.Item>
        </Form>
    );
}

export default ForgotPasswordForm