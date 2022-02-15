import httpServices from "./http.services";
import localStorageService from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServices.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServices.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpServices.get(
            userEndPoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpServices.patch(
            userEndPoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};
export default userService;
