import React from 'react';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../components/navbar';
import ForgotPasswordForm from './Stepper';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';
import './ForgotPassword.css';

function ForgotPassword() {
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    return (
        <MainLayout
            content={<ForgotPasswordForm />}
            header={<Navbar />}
            title={title}
        />
    );
}

export default ForgotPassword;