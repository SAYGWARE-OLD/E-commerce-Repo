import React, { useState, useEffect } from 'react';
import { fetchUserAttributes, updateUserAttribute, deleteUserAttributes } from 'aws-amplify/auth';
import { Form, Input, Button, notification } from 'antd';
import '../Profile.css';

const UserProfileForm = () => {
    const [attributes, setAttributes] = useState({
        email: '',
        name: '',
        age: '',
        gender: '',
        address: ''
    });

    useEffect(() => {
        const loadUserAttributes = async () => {
            try {
                const userAttributes = await fetchUserAttributes();
                setAttributes({
                    email: userAttributes.email || '',
                    name: userAttributes.name || '',
                    age: userAttributes.age || '',
                    gender: userAttributes.gender || '',
                    address: userAttributes.address || ''
                });
            } catch (error) {
                console.log('Error fetching user attributes:', error);
            }
        };

        loadUserAttributes();
    }, []);

    const handleChange = (e) => {
        setAttributes({
            ...attributes,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateUserAttribute = async (attributeKey, value) => {
        try {
            await updateUserAttribute({
                userAttribute: {
                    attributeKey,
                    value
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUserAttribute = async (attributeKey) => {
        try {
            await deleteUserAttributes({
                userAttributeKeys: [attributeKey]
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            for (const [attributeKey, value] of Object.entries(attributes)) {
                if (value) {
                    await handleUpdateUserAttribute(attributeKey, value);
                }
            }
            notification.success({
                message: 'Update Successful',
                description: 'User attributes updated successfully!',
                placement: 'topRight',
                duration: 3,
            });
        } catch (error) {
            notification.error({
                message: 'Error updating user attributes',
                description: error.message,
                placement: 'topRight',
                duration: 3,
            });
        }
    };

    const handleClear = async () => {
        try {
            for (const attributeKey of Object.keys(attributes)) {
                await handleDeleteUserAttribute(attributeKey);
            }
            setAttributes({
                email: '',
                name: '',
                age: '',
                gender: '',
                address: ''
            });
            notification.success({
                message: 'Cleaning Successful',
                description: 'User attributes cleared successfully!',
                placement: 'topRight',
                duration: 3,
            });
        } catch (error) {
            console.log('Error clearing user attributes:', error);
        }
    };

    return (
        <div className="profile-page-container">
            <div className="saved-data-container">
                <Form className="profile-form" onFinish={handleSubmit}>
                    <h2>User Profile</h2>
                    <div className='form-item'>
                        <Form.Item label="Email:">
                            <Input
                                className='input-profile-email'
                                type="email"
                                name="email"
                                value={attributes.email}
                                onChange={handleChange}
                                disabled
                            />
                        </Form.Item>
                    </div>
                    <div className='form-item'>
                        <Form.Item label="Name:">
                            <Input
                                className='input-profile-name'
                                type="text"
                                name="name"
                                value={attributes.name}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>
                    <div className='form-item'>
                        <Form.Item label="Age:">
                            <Input
                                className='input-profile-age'
                                type="number"
                                name="age"
                                value={attributes.age}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>
                    <div className='form-item'>
                        <Form.Item label="Gender:">
                            <Input
                                className='input-profile-gender'
                                type="text"
                                name="gender"
                                value={attributes.gender}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>
                    <div className='form-item'>
                        <Form.Item label="Address:">
                            <Input
                                className='input-profile-address'
                                type="text"
                                name="address"
                                value={attributes.address}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item className='profile-buttons'>
                        <Button className='update-button' type="primary" htmlType="submit">Update</Button>
                        <Button type="default" onClick={handleClear} style={{ marginLeft: '10px' }}>Clear</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UserProfileForm;