import React from 'react';
import { Form, Input, Button } from 'antd';
import handleSignUp from '@/utils/SignUp';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '@/routing/routes';
import { ROUTES_ID } from '@/routing/routes_id';
import '../../Register.css';
import EmailInput from '../../../../components/EmailInput';
import PasswordInput from '../../../../components/PasswordInput';
import ConfirmPassword from '../../../../components/ConfirmPassword';

const RegisterForm = ({ onFinish }) => {
    const [form] = Form.useForm();

    const handleFormSubmit = (values) => {
        handleSignUp({
            username: values.name,
            email: values.email,
            password: values.password
        });
        onFinish(values);
    };

    const navigate = useNavigate();
    const handleGoLogin = () => {
        navigate(getRoutePath(ROUTES_ID.login));
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                <Form
                    className="register-form"
                    layout="vertical"
                    form={form}
                    name="register"
                    onFinish={handleFormSubmit}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        tooltip="What do you want others to call you?"
                        rules={[{
                            required: true,
                            message: 'Please input your name!',
                            whitespace: true,
                        }]}
                        className="register-form-item"
                    >
                        <Input />
                    </Form.Item>

                    <EmailInput />

                    <PasswordInput
                        name="password"
                        label="Password"
                    />

                    <ConfirmPassword />

                    <Form.Item className="register-form-buttons">
                        <Button type="primary" htmlType="submit" className="register-button">
                            Register
                        </Button>
                        <Button type="default" onClick={handleGoLogin} className="login-button">
                            Go to Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
