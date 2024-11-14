import React from 'react';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../components/navbar';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';
import FavoriteForm from './FavoriteForm';

function Favorite() {
    const location = useLocation();
    const title = getRouteTitle(location.pathname);
    return (
        <MainLayout content={<FavoriteForm />} header={<Navbar />} title={title} />
    );
}

export default Favorite;