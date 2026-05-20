import { pool } from "../../db";
import type { Iissue } from "./issue.interface";

const createIssueIntoDB = async (payload: Iissue, userId: number) => {
  const { title, description, type, status } = payload;

  const result = await pool.query(
    `
        INSERT INTO issues(title,description,type,status,reporter_id)VALUES($1,$2,$3,COALESCE($4,'open'),$5) RETURNING *
        `,
    [title, description, type, status, userId],
  );
  return result;
};

export const issueService = {
  createIssueIntoDB,
};
