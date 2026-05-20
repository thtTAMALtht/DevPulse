import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: IAuth) => {
  const { email, password } = payload;
  //Check if the user exists
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
    `,
    [email],
  );
  if (userData.rows.length == 0) {
    throw new Error("invalid credentials!");
  }

  //Compare the password
  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Password not matched!");
  }

  //generate jwt token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.accessTokenSecret as string, {
    expiresIn: "3h",
  });
  return {
    token: accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

export const authService = {
  loginUserIntoDB,
};
