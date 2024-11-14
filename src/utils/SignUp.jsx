import React from 'react';
import { notification } from 'antd';
import { signUp } from 'aws-amplify/auth';

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const allowedDomains = ['@gmail.com', '@hotmail.com', '@outlook.com'];
  return re.test(email) && allowedDomains.some(domain => email.endsWith(domain));
};

async function handleSignUp({ username, password, email }) {
  if (!isValidEmail(email)) {
    notification.error({
      message: 'Invalid Email',
      description: 'Please enter a valid @gmail.com or @hotmail.com email address.',
      placement: 'topRight',
      duration: 3,
    });
    return;
  }

  try {
    const { user } = await signUp({
      username: email,
      password,
      attributes: {
        email,
        'custom:name': username,
      },
      autoSignIn: {
        enabled: true,
      },
    });

    console.log(user);
    notification.success({
      message: 'Registration Successful',
      description: 'Confirm your email',
      placement: 'topRight',
      duration: 3,
    });
  } catch (error) {
    console.log('Error while registering:', error);
    notification.error({
      message: 'Registration Error',
      description: error.message,
      placement: 'topRight',
      duration: 3,
    });
  }
}

export default handleSignUp;