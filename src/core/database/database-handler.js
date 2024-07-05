import pg from "pg";
import { POSTGRES_CREDENTIALS } from "../secrets/index.js";

const { Client } = pg;

const query = async (query, params) => {
  const client = new Client(POSTGRES_CREDENTIALS);
  await client.connect();
  try {
    const res = await client.query(query, params);
    console.log(res.rows[0].message);
    return res;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    await client.end();
  }
};

export { query };
