import axios, { AxiosError, AxiosInstance } from "axios";
import joi from 'joi';

import Rocket from "operations/rocketsOne/Rocket";

interface SpaceXResponse {
    id: string;
    company: string;
    country: string;
    flickr_images: string[];
    cost_per_launch: number;
    message?: string;
}

const SpaceXResponseJoiScheme = joi.object({
    id: joi.string().required(),
    company: joi.string().required(),
    country: joi.string().required(),
    flickr_images: joi.array().items(joi.string().uri()),
    cost_per_launch: joi.number()
});

export class SpaceXError extends Error {
    public readonly status: number;
    constructor(message: string, status: number){
        super(message);
        this.status = status;
    }
}

export default class SpaceXService {
    private client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.spacexdata.com/'
        });
    }
    async getRocketById(id: string): Promise<Rocket | null>  {
        try {
            const { data } = await this.client.get<SpaceXResponse>(`https://api.spacexdata.com/v4/rockets/${id}`);
            const validationResult = SpaceXResponseJoiScheme.validate(data, { allowUnknown: true });
            if (validationResult.error) {
                console.log(validationResult.error);
                throw new SpaceXError('Wrong spaceX Service response', 500);
            }

            const rocket = this.mapSpaceXResponse(data as SpaceXResponse);
            return rocket;
        }catch(error) {
            if(error instanceof AxiosError) {
                throw new SpaceXError(error.response?.data, error.response?.status || 500);
            }
        }
        return null;
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