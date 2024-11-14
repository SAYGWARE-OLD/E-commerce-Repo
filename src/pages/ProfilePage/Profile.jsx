import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';
import ProfileLayout from '../../layout/ProfileLayout';
import ProfileForm from './ProfileForm/ProfileForm';
import SiderForm from '../../components/sider';
import { fetchUserAttributes } from 'aws-amplify/auth';

function Profile() {
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
            content={<ProfileForm attributes={attributes} />}
            header={<Navbar />}
            sider={<SiderForm userName={userName} />}
            title={title}
        />
    );
}

export default Profile;