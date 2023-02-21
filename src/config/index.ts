import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

let envConfig = dotenv.config();

if (envConfig.error) {
  throw new Error("Coudn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || "Silly",
  },
  databaseURL: process.env.MONGODB_URI,
};
