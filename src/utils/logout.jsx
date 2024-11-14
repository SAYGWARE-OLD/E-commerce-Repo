import { signOut } from 'aws-amplify/auth';

async function logout() {
    try {
        await signOut();
        return true;
    } catch (error) {
        console.log('error signing out', error);
        return false;
    }
}

export default logout;