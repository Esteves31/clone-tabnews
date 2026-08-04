const { exec } = require("node:child_process");

function checkPostgresConnection() {
    exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

    function handleReturn(error, stdout, stderr) {
        if (stdout.search("accepting connections") === -1) {
            checkPostgresConnection();
            return;
        }

        console.log("🟢 Postgres está aceitando conexões!");
    }
}

console.log("🔴 Aguardando Postgres aceitar conexões...");
checkPostgresConnection();
