import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// 2. SECOND: Now import your pool and file system modules
import { db } from "./index"; // Adjust this path to point to your index.ts file
import * as fs from "fs";

async function migrate() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  await db.query(schema);

  console.log("Database migrated");
  process.exit(0);
}

migrate();
