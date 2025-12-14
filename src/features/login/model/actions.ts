import { authApi } from "@/entities/auth";
import { useSession } from "@/entities/session";
import { useUser } from "@/entities/user";

export const login = async () => {
    try {
        console.log('Start login request...');
        const response = await authApi.login();
        console.log('Response received:', response);

        const { data } = response;

        if (!data) throw new Error('No data received');
        if (!data._id) throw new Error('User ID missing in response');

        useSession.getState().actions.onSignin(data._id);
        useUser.getState().actions.onSignin(data);
    } catch (error: any) {
        console.error('Login failed:', error);
        
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
        
        useSession.setState({ 
            isAuthInProgress: false, 
            error: errorMessage
        });
    }
}