import React, { useState } from 'react';
import { Steps } from 'antd';
import ForgotResetPasswordForm from '../ForgotResetPassword/ForgotResetPasswordForm';
import Successfully from '../../utils/Successfully';
import ForgotPasswordForm from './pageComponents/ForgotPasswordForm/ForgotPasswordForm';

function Stepper() {
    const [current, setCurrent] = useState(0);
    const [loginDetails, setLoginDetails] = useState(null);
    const [passwordDetails, setPasswordDetails] = useState(null);

    const onFinishLoginForm = (values) => {
        setLoginDetails(values);
        setCurrent(1);
    };

    const onFinishPasswordForm = (values) => {
        setPasswordDetails(values);
        setCurrent(2);
    };

    const forms = [
        <ForgotPasswordForm onFinish={onFinishLoginForm} initialValues={loginDetails} />,
        <ForgotResetPasswordForm onFinish={onFinishPasswordForm} initialValues={passwordDetails} />,
        <Successfully />
    ];

    const isStepDisabled = (stepNumber) => {
        if (stepNumber === 0) return false;
        if (stepNumber === 1) return loginDetails === null;
        if (stepNumber === 2) return loginDetails === null || passwordDetails === null;
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <div className="steps-container">
                    <Steps current={current}>
                        <Steps.Step title="Reset Password" disabled={isStepDisabled(0)} />
                        <Steps.Step title="New Password" disabled={isStepDisabled(1)} />
                        <Steps.Step title="Successfully" disabled={isStepDisabled(2)} />
                    </Steps>
                </div>
                {forms[current]}
            </div>
        </div>
    );
}

ForgotPasswordForm

ForgotResetPasswordForm

Successfully

export default Stepper;