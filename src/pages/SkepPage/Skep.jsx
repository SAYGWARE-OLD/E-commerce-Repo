import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';
import SkepForm from './SkepForm';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';

function Skep() {
    const [attributes, setAttributes] = useState({});
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    return (
        <MainLayout content={<SkepForm attributes={attributes} />} header={<Navbar />} title={title} />
    );
}

export default Skep;