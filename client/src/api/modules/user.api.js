import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
    signIn: "user/signin",
    signUp: "user/signup",
    getInfo: "user/info",
    passwordUpdate: "user/update-password",
};

const userApi = {
    signIn: async ({ username, password }) => {
        try {
            const res = await publicClient.post(userEndpoints.signIn, {
                username,
                password,
            });

            return { res };
        } catch (error) {
            return { error };
        }
    },
    signUp: async ({ username, password, confirmPassword, displayName }) => {
        try {
            const res = await publicClient.post(userEndpoints.signUp, {
                username,
                password,
                confirmPassword,
                displayName,
            });

            return { res };
        } catch (error) {
            return { error };
        }
    },
    getInfo: async () => {
        try {
            const res = await privateClient.get(userEndpoints.getInfo);

            return { res };
        } catch (error) {
            return { error };
        }
    },
    passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
        try {
            const res = await privateClient.put(userEndpoints.passwordUpdate, {
                password,
                newPassword,
                confirmNewPassword,
            });

            return { res };
        } catch (error) {
            return { error };
        }
    },
};

export default userApi;
