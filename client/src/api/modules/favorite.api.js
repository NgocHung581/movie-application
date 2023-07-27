import privateClient from "../client/private.client";

const favoriteEndpoints = {
    list: "user/favorites",
    add: "user/favorites",
    remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

const favoriteApi = {
    getList: async () => {
        try {
            const res = await privateClient.get(favoriteEndpoints.list);

            return { res };
        } catch (error) {
            return { error };
        }
    },
    add: async ({ mediaType, mediaId, mediaTitle, mediaPoster, mediaRate }) => {
        try {
            const res = await privateClient.post(favoriteEndpoints.add, {
                mediaType,
                mediaId,
                mediaTitle,
                mediaPoster,
                mediaRate,
            });

            return { res };
        } catch (error) {
            return { error };
        }
    },
    remove: async ({ favoriteId }) => {
        try {
            const res = await privateClient.delete(
                favoriteEndpoints.remove({ favoriteId })
            );

            return { res };
        } catch (error) {
            return { error };
        }
    },
};

export default favoriteApi;
