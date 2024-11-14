import React from 'react';
import { useLocation } from 'react-router-dom';

import MainLayout from '../../../layout/MainLayoutPage/MainLayout';
import TshirtForm from './TshirtForm';
import Navbar from '../../../components/navbar';
import { getRouteTitle } from '../../../routing/routes';

function TshirtPage() {
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    return (
        <MainLayout content={<TshirtForm />} header={<Navbar />} title={title} />
    );
}

export default TshirtPage;