import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import "./PaymentStepper.css";
import { CheckCircleOutlined } from '@ant-design/icons';
import './PaymentStepper.css'

function PaymentSuccessfully() {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className='payment-successfully'>
            <CheckCircleOutlined style={{ fontSize: "50px" }} />
            <h3>Your payment has been made successfully.</h3>
            <Button className='home-button' onClick={handleGoHome}>
                Go Home
            </Button>
        </div>
    );
}

export default PaymentSuccessfully;