import { authApi } from "@/entities/auth";
import { useSession } from "@/entities/session";
import { useUser } from "@/entities/user";

export const login = async () => {
    try {
        const { data } = await authApi.login();

        useSession.getState().actions.on_signin(data._id);
        useUser.getState().actions.on_signin(data);
    } catch (error) {
        useSession.setState({ is_auth_in_progress: false });
    }
}