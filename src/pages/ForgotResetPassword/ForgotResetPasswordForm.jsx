import React, { useState } from 'react';
import { Form, Input, Button, Steps, notification } from 'antd';
import handleConfirmResetPassword from '../../utils/confirmResetPassword';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';

function ForgotResetPasswordForm({ onFinish, initialValues }) {
    const [email, setEmail] = useState(initialValues?.email || '');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handlereset = async (values) => {
        try {
            await handleConfirmResetPassword({
                email: values.email,
                confirmationCode: values.verificationCode,
                newPassword: values.newPassword
            });
            onFinish(values);
        } catch (error) {
            console.error('Password reset failed:', error);
        }
    };

    return (
        <Form
            name="forgot_password"
            onFinish={handlereset}
            layout='vertical'
            initialValues={{ email, verificationCode, newPassword }}
        >
            <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Item
                name="verificationCode"
                label="Verification Code"
                rules={[
                    {
                        required: true,
                        message: 'Please input the verification code!',
                    },
                ]}
            >
                <Input value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            </Form.Item>

            <PasswordInput
                name={"newPassword"}
                label={"New Password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <Form.Item>
                <div className='forgotPasswordButton'>
                    <Button className='reset-button' type="primary" htmlType="submit">
                        Reset Password
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

export default ForgotResetPasswordForm