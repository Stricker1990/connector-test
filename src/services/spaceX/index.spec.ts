import axios, { AxiosError, AxiosResponse } from "axios";
import SpaceXService, { SpaceXError, SpaceXResponse } from ".";
import { error } from "console";

jest.mock('axios');

const spaceXResponse: SpaceXResponse = {
    id: "5e9d0d95eda69955f709d1eb",
    company: "SpaceX",
    country: "Republic of the Marshall Islands",
    cost_per_launch: 6700000,
    flickr_images: [
		"https://imgur.com/DaCfMsj.jpg",
		"https://imgur.com/azYafd8.jpg"
	]
};

describe("SpaceXService", () => {
    let spaceXService: SpaceXService | null = null;
    beforeEach(() => {
        (axios.create as jest.Mock).mockImplementation(() => axios);
        spaceXService = new SpaceXService();
    });
    describe("getRocketById", () => {
        it("Should get Rocket succesfully", async () => {
            const resp = {
                status: 200, data: spaceXResponse
            };
            (axios.get as jest.Mock).mockResolvedValue(resp);
            const rocket = await spaceXService?.getRocketById("5e9d0d95eda69955f709d1eb");
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(rocket).toEqual(rocket);
        });
        it("Shoud generate error for non 200 status", async () => {
            (axios.get as jest.Mock).mockRejectedValueOnce({
                response: {
                    status: 404,
                    statusText: 'Not Found',
                    data: {
                        message: 'Not Found',
                    },
                },
            } as AxiosError);
            try {
                await spaceXService?.getRocketById("any_wrong_id");
            } catch(error) {
                expect(error).toEqual(new SpaceXError("Not Found", 404));
            }
        })
    });
});