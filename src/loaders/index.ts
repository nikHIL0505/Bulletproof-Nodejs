import mongooseLoader from "./mongoose";
import expressLoader from "./express";

import Loggers from "./logger";

export default async ({ expressApp }) => {
  let mongoConnection = await mongooseLoader();
  Loggers.info("🤝 DB is loaded and connected.");
  await expressLoader({ app: expressApp });
  Loggers.info("🤞 Express loaded");
};
