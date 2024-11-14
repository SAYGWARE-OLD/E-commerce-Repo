import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../../components/navbar';
import { getRouteTitle } from '../../../routing/routes';
import PantForm from './PantsForm';


function PantPage() {
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    return (
        <MainLayout content={<PantForm />} header={<Navbar />} title={title} />
    );
}

export default PantPage;