// import { Client, sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';

import * as schema from "./schema";

const client = postgres('postgresql://postgres:postgres@localhost:54322/postgres');

export const db = drizzle(client, { schema });
