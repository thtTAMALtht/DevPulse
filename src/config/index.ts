import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT,
  connectionString: process.env.CONNECTION_STRING,
  accessTokenSecret: process.env.JWT_SECRET,
  access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
};

export default config;
