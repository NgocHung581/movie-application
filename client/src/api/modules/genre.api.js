import publicClient from "../client/public.client";

const genreEndpoints = {
    list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
    getList: async ({ mediaType }) => {
        try {
            const res = await publicClient.get(
                genreEndpoints.list({ mediaType })
            );

            return { res };
        } catch (error) {
            return { error };
        }
    },
};

export default genreApi;
