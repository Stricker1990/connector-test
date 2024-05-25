import { Result } from "dispatch";
import { Route } from "OpenApiRouter";

export const handleRocketsOne = (_route: Route): Result | null => {
  return {
    status: 200,
    body: {
      message: `${_route.pathParameters?.rocketId}`,
    },
  };
};
