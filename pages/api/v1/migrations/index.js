import { join } from "node:path";
import migrationRunner from "node-pg-migrate";

async function migrations(request, response) {
    const defaultMigrationConfig = {
        databaseUrl: process.env.DATABASE_URL,
        dir: join("infra", "migrations"),
        direction: "up",
        dryRun: true,
        verbose: true,
        migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
        const pendingMigrations = await migrationRunner(defaultMigrationConfig);
        return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
        const migratedMigrations = await migrationRunner({
            ...defaultMigrationConfig,
            dryRun: false,
        });

        if (migratedMigrations.length > 0) {
            return response.status(201).json(migratedMigrations);
        }

        return response.status(200).json(migratedMigrations);
    }

    return response.status(405).json({ message: "Método não permitido" });
}

export default migrations;
