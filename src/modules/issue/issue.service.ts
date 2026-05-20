import { pool } from "../../db";
import type { Iissue } from "./issue.interface";

const createIssueIntoDB = async (payload: Iissue, userId: number) => {
  const { title, description, type, status } = payload;
  //1.title check
  if (!title || title.length > 150) {
    throw new Error("Title is required and max 150 characters");
  }

  //2.description check
  if (!description || description.length < 20) {
    throw new Error("Description must be at least 20 characters");
  }

  //3.type check
  if (!["bug", "feature_request"].includes(type)) {
    throw new Error("Type must be bug or feature_request");
  }

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
