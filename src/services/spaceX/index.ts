import axios, { AxiosInstance } from "axios";

export default class SpaceXService {
    private client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.spacexdata.com/'
        });
    }
    async getRocketById(id: string) {
        return this.client.get(`https://api.spacexdata.com/v4/rockets/${id}`);
    }
}