import { Result } from "dispatch";
import { Route } from "OpenApiRouter";

import SpaceXService, { SpaceXError } from "services/spaceX";

const spaceXService = new SpaceXService();

export const handleRocketsOne = async (_route: Route): Promise<Result | null> => {
  try {
    const rocket = await spaceXService.getRocketById(_route.pathParameters?.rocketId);
    return {
      status: 200,
      body: rocket,
    };
  } catch(error) {
    const { status, message } = error as SpaceXError;
    return {
      status,
      body: message
    }
  }
};
