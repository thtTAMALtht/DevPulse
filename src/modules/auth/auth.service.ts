import { pool } from "../../db";
import type { IAuth } from "./auth.interface";

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
  console.log(userData)

//Compare the password




};

export const authService = {
  loginUserIntoDB,
};
