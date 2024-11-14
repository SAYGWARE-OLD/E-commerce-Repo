import { notification } from 'antd';
import { signIn } from 'aws-amplify/auth';

async function login({ email, password }) {
  try {
    await signIn({ username: email, password });
  
    notification.success({
      message: 'Logged in',
      description: 'You have successfully logged in.',
      placement: 'topRight',
      duration: 3,
    });

    return true;
  } catch (error) {
    console.log('error signing in', error);
    notification.error({
      message: 'Login failed',
      description: error.message,
      placement: 'topRight',
      duration: 3,
    });

    return false;
  }
}

export default login;