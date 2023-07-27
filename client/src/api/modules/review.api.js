import privateClient from "../client/private.client";

const reviewEndpoints = {
    list: "reviews",
    add: "reviews",
    remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
    add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
        try {
            const res = await privateClient.post(reviewEndpoints.add, {
                mediaId,
                mediaType,
                mediaTitle,
                mediaPoster,
                content,
            });

            return { res };
        } catch (error) {
            return { error };
        }
    },
    remove: async ({ reviewId }) => {
        try {
            const res = await privateClient.delete(
                reviewEndpoints.remove({ reviewId })
            );

            return { res };
        } catch (error) {
            return { error };
        }
    },
    getList: async () => {
        try {
            const res = await privateClient.get(reviewEndpoints.list);

            return { res };
        } catch (error) {
            return { error };
        }
    },
};

export default reviewApi;
