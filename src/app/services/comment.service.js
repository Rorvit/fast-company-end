import httpServices from "./http.services";

const commentEndPoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpServices.put(
            commentEndPoint + payload._id,
            payload
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpServices.get(commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpServices.delete(commentEndPoint + commentId);
        return data;
    }
};
export default commentService;
