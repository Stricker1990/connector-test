import { Result } from "dispatch";
import { Route } from "OpenApiRouter";

import SpaceXService from "services/spaceX";

const spaceXService = new SpaceXService();

export const handleRocketsOne = async (_route: Route): Promise<Result | null> => {
  const { status, data } = await spaceXService.getRocketById(_route.pathParameters?.rocketId);
  return {
    status: status,
    body: data,
  };
};
