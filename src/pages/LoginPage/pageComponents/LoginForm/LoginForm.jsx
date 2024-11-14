import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getRoutePath } from '@/routing/routes';
import { ROUTES_ID } from '@/routing/routes_id';
import login from '@/utils/login';
import EmailInput from '../../../../components/EmailInput';
import PasswordInput from '../../../../components/PasswordInput';
import '../../Login.css'

const LoginForm = () => {
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        const success = await login({
            email: values.email,
            password: values.password
        });

        if (success) {
            navigate(getRoutePath(ROUTES_ID.home));
        }
    };

    const handleGoLogin = () => {
        navigate(getRoutePath(ROUTES_ID.forgotpassword));
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    layout='vertical'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleFinish}
                >
                    <EmailInput
                        prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                    <PasswordInput
                        name={"password"}
                        label={"Password"}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                    />
                    <Form.Item className="login-options">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="custom-checkbox">Remember me</Checkbox>
                        </Form.Item>

                        <Link onClick={handleGoLogin} className="login-form-forgot">
                            Forgot password
                        </Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <div className="login-register">
                            Or <Link className="login-register-link" to="/register">register now!</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;