import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '../routing/routes';
import { ROUTES_ID } from '../routing/routes_id';
import './sider.css';

const { Header, Sider } = Layout;

const SiderForm = ({ userName }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleUpdatePassword = () => {
        navigate(getRoutePath(ROUTES_ID.updatepassword));
    };

    const handleUpdateProfile = () => {
        navigate(getRoutePath(ROUTES_ID.profile));
    };

    const handleMyOrders = () => {
        navigate(getRoutePath(ROUTES_ID.myOrders));
    };

    const items = [
        {
            key: 'sub1',
            icon: <UserOutlined style={{ cursor: 'pointer', color: "wheat" }} />,
            label: <p style={{ cursor: 'pointer', color: "wheat" }}>{userName} Settings</p>,
            children: [
                {
                    key: '1',
                    label: <span className='items-label'>Update Profile</span>,
                    onClick: handleUpdateProfile,
                },
                {
                    key: '2',
                    label: <span className='items-label'>Change Password</span>,
                    onClick: handleUpdatePassword,
                },
                {
                    key: '3',
                    label: <span className='items-label'>My Orders</span>,
                    onClick: handleMyOrders,
                },
            ],
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ background: 'black' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: 'black' }} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        backgroundColor: '#f7f7f7',
                    }}
                />
                <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default SiderForm;