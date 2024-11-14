import { notification } from 'antd';
import { confirmResetPassword } from 'aws-amplify/auth';

async function handleConfirmResetPassword({
    email,
    confirmationCode,
    newPassword
}) {
    try {
        await confirmResetPassword({
            username: email,
            confirmationCode, 
            newPassword
        });
        notification.success({
            message: 'Password reset',
            description: '',
            placement: 'topRight',
            duration: 3,
        });
        console.log('Password reset successfully.');
    } catch (error) {
        notification.error({
            message: 'Check the email or code',
            description: error.message,
            placement: 'topRight',
            duration: 3,
        });
        console.error('Password reset failed:', error);
        throw error;
    }
}

export default handleConfirmResetPassword;