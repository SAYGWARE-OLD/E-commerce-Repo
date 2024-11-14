import React from 'react';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';
import Navbar from '../../components/navbar';
import { useLocation } from 'react-router-dom';
import { getRouteTitle } from '../../routing/routes';
import './ForgotPassword.css';
import ForgotResetPasswordForm from './forgotResetPasswordForm';


function ForgotPassword() {
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    return (
        <MainLayout
            content={<ForgotResetPasswordForm />}
            header={<Navbar />}
            title={title}
        />
    );
}

export default ForgotPassword;