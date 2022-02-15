import httpServices from "./http.services";

const qualitiesEndPoint = "quality/";

const qualitiesService = {
    get: async () => {
        const { data } = await httpServices.get(qualitiesEndPoint);
        return data;
    }
};
export default qualitiesService;
