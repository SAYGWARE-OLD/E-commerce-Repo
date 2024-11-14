import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../layout/ProfileLayout';
import MyOrdersForm from './myOrdersForm';
import Navbar from '../../components/navbar';
import SiderForm from '../../components/sider';
import { getRouteTitle } from '../../routing/routes';
import { useLocation } from 'react-router-dom';
import { fetchUserAttributes } from 'aws-amplify/auth';

function myOrders() {
    const [attributes, setAttributes] = useState({});
    const [userName, setUserName] = useState('');
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    useEffect(() => {
        const loadUserAttributes = async () => {
            try {
                const userAttributes = await fetchUserAttributes();
                setAttributes(userAttributes);
                setUserName(userAttributes.name || '');
            } catch (error) {
                console.log('Error fetching user attributes:', error);
            }
        };

        loadUserAttributes();
    }, []);
    return (
        <ProfileLayout
            content={<MyOrdersForm />}
            header={<Navbar />}
            sider={<SiderForm userName={userName} />}
            title={title}
        />
    );
}

export default myOrders