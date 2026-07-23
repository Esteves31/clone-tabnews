import { join } from "node:path";
import migrationRunner from "node-pg-migrate";

async function migrations(request, response) {
    if (request.method === "GET") {
        const migrations = await migrationRunner({
            databaseUrl: process.env.DATABASE_URL,
            dir: join("infra", "migrations"),
            direction: "up",
            dryRun: true,
            verbose: true,
            migrationsTable: "pgmigrations",
        });
        return response.status(200).json([migrations]);
    }

    if (request.method === "POST") {
        const migrations = await migrationRunner({
            databaseUrl: process.env.DATABASE_URL,
            dir: join("infra", "migrations"),
            direction: "up",
            dryRun: false,
            verbose: true,
            migrationsTable: "pgmigrations",
        });
        return response.status(200).json([migrations]);
    }

    return response.status(405).json({ message: "Métodos não permitido" });
}

export default migrations;
