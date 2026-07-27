import { join } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";

async function migrations(request, response) {
    const allowedMethods = ["GET", "POST"];

    if (!allowedMethods.includes(request.method)) {
        return response.status(405).json({ message: "Método não permitido" });
    }

    const dbClient = await database.getNewClient();

    const defaultMigrationConfig = {
        dbClient: dbClient,
        dir: join("infra", "migrations"),
        direction: "up",
        dryRun: true,
        verbose: true,
        migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
        const pendingMigrations = await migrationRunner(defaultMigrationConfig);
        dbClient.end();
        return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
        const migratedMigrations = await migrationRunner({
            ...defaultMigrationConfig,
            dryRun: false,
        });

        dbClient.end();

        if (migratedMigrations.length > 0) {
            return response.status(201).json(migratedMigrations);
        }

        return response.status(200).json(migratedMigrations);
    }
}

export default migrations;
