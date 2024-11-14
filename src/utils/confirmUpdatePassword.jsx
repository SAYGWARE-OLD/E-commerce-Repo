import { notification } from 'antd';
import { updatePassword } from 'aws-amplify/auth';

async function handleUpdatePassword({
    oldPassword,
    newPassword
}) {
    try {
        await updatePassword({
            oldPassword,
            newPassword
        });
        notification.success({
            message: 'Password updated',
            description: '',
            placement: 'topRight',
            duration: 3,
        });
    } catch (err) {
        console.log(err);
        notification.error({
            message: 'Check the email or code',
            description: err.message,
            placement: 'topRight',
            duration: 3,
        });
    }
}

export default handleUpdatePassword;