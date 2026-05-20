import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import { pool } from "../../db";

const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      //check token exists
      if (!token) {
        sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized access!",
        });
      }

      //verify token
      const decoded = jwt.verify(
        token as string,
        config.accessTokenSecret as string,
      ) as JwtPayload;

      //find user in the database
      const userData = await pool.query(
        `
       SELECT * FROM users WHERE email = $1 
        `,
        [decoded.email],
      );

      const user = userData.rows[0];

      if (userData.rows.length === 0) {
        throw new Error("user not found");
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authMiddleware;
