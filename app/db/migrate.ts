import fs from "fs";
import { db } from "./index";

async function migrate() {
  const sql = fs.readFileSync("./db/schema.sql", "utf-8");

  await db.query(sql);

  console.log("Database migrated");
  process.exit(0);
}

migrate();
