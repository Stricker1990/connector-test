import { Result } from "dispatch";
import { Route } from "OpenApiRouter";

import SpaceXService from "services/spaceX";
const spaceXService = new SpaceXService();

export const handleRocketsOne = async (_route: Route): Promise<Result | null> => {
  const result = await spaceXService.getRocketById(_route.pathParameters?.rocketId);
  return {
    status: 200,
    body: {
      message: `${result}`,
    },
  };
};
