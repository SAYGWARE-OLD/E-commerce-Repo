import { fetchAuthSession } from 'aws-amplify/auth';

export const currentSession = async () => {
    try {
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        console.log("Access Token:", accessToken.toString());
        console.log("ID Token:", idToken);
        return accessToken;
    } catch (err) {
        console.log(err);
        return null;
    }
};