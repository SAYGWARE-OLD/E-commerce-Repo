import React, { useState } from 'react';
import { confirmSignUp } from 'aws-amplify';

function ConfirmSignUp() {
    const [username, setUsername] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [message, setMessage] = useState('');

    async function handleSignUpConfirmation() {
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username,
                confirmationCode,
            });
            setMessage('Sign up confirmed successfully!');
        } catch (error) {
            setMessage('Error confirming sign up: ' + error.message);
        }
    }

    return (
        <div>
            <h2>Confirm Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Confirmation Code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <button onClick={handleSignUpConfirmation}>Confirm Sign Up</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ConfirmSignUp;