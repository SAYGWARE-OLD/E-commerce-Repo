import React from 'react';
import MainLayout from '../../layout/MainLayoutPage/MainLayout';
import PaymentStepper from './PaymentStepper'
import { getRouteTitle } from '../../routing/routes';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar';
import "./PaymentStepper.css"

function Payment() {
    const location = useLocation();
    const title = getRouteTitle(location.pathname);

    return (
        <MainLayout
            content={<PaymentStepper />}
            header={<Navbar />}
            title={title}
        />
    );
}

export default Payment;