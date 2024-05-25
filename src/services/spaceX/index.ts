import axios, { AxiosInstance } from "axios";
import Rocket from "operations/rocketsOne/Rocket";

interface SpaceXResponse {
    id: string;
    company: string;
    country: string;
    flickr_images: string[];
    cost_per_launch: number;
}

export default class SpaceXService {
    private client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.spacexdata.com/'
        });
    }
    async getRocketById(id: string): Promise<Rocket>  {
        const { data } = await this.client.get<SpaceXResponse>(`https://api.spacexdata.com/v4/rockets/${id}`);
        const rocket = this.mapSpaceXResponse(data);
        return rocket;
    }

    private mapSpaceXResponse(spaceXResponse: SpaceXResponse): Rocket {
        const { id, company, country, flickr_images, cost_per_launch } =  spaceXResponse;
        return {
          id,
          company: company?.toUpperCase() || '',
          country,
          main_image: flickr_images?.[0] || '',
          cost_per_launch: {
            amount: cost_per_launch,
            currency: 'USD'
          }
        }
      }
}