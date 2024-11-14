import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../../components/navbar';
import { getRouteTitle } from '../../../routing/routes';
import ShortForm from './ShortsForm';

function ShortPage() {
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    return (
        <MainLayout content={<ShortForm />} header={<Navbar />} title={title} />
    );
}

export default ShortPage;