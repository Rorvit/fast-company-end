import httpServices from "./http.services";

const professionEndPoint = "profession/";

const professionService = {
    get: async () => {
        const { data } = await httpServices.get(professionEndPoint);
        return data;
    }
};
export default professionService;
