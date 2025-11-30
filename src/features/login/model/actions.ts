import { authApi } from "@/entities/auth";
import { useSession } from "@/entities/session";
import { useUser } from "@/entities/user";

export const login = async () => {
    try {
        const { data } = await authApi.login();

        useSession.getState().actions.onSignin(data._id);
        useUser.getState().actions.onSignin(data);
    } catch (error) {
        useSession.setState({ isAuthInProgress: false });
    }
}