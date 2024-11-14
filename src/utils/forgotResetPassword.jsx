import { notification } from 'antd';
import { resetPassword } from 'aws-amplify/auth';

async function handleResetPassword(email) {
    try {
        const output = await resetPassword({ username: email });
        handleResetPasswordNextSteps(output);
        notification.success({
            message: 'Password reset was successful',
            description: 'Reset code sent.',
            placement: 'topRight',
            duration: 3,
        });
        return true;
    } catch (error) {
        notification.error({
            message: 'Password reset failed',
            description: error.message,
            placement: 'topRight',
            duration: 3,
        });
        console.log(error);
        return false;
    }
}

function handleResetPasswordNextSteps(output) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
        case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
            const codeDeliveryDetails = nextStep.codeDeliveryDetails;
            console.log(
                `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
            );
            break;
        case 'DONE':
            console.log('Successfully reset password.');
            break;
    }
}

export default handleResetPassword;