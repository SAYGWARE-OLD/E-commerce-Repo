import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './UpdatePassword.css';
import handleUpdatePassword from '../../utils/confirmUpdatePassword';

function UpdatePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdate = async (values) => {
        try {
            await handleUpdatePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            });

            console.log('Password updated successfully:', values);
        } catch (error) {
            console.error('Password reset failed:', error);
        }
    };

    return (
        <div className="update-password-container">
            <Form
                name="update_password"
                onFinish={handleUpdate}
                layout='vertical'
                className="update-password-form"
                initialValues={{ oldPassword, newPassword }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Password</h2>
                <Form.Item
                    name="oldPassword"
                    label="Old Password"
                    rules={[{ required: true, message: 'Please input your old password!' }]}
                >
                    <Input.Password
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your old password"
                    />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                    />
                </Form.Item>

                <Form.Item>
                    <div className='updatePasswordButton'>
                        <Button className='updatePasswordButton' type="primary" htmlType="submit">
                            Update Password
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdatePasswordForm;