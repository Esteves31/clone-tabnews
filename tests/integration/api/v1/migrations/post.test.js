import database from "infra/database";

async function cleanDatabase() {
    await database.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

test("POST / api/v1/migrations should return 200 OK", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    expect(response.status).toBe(201);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    const responseAfterPost = await fetch(
        "http://localhost:3000/api/v1/migrations",
    );
    expect(responseAfterPost.status).toBe(200);

    const responseBodyAfterPost = await responseAfterPost.json();
    expect(Array.isArray(responseBodyAfterPost)).toBe(true);
    expect(responseBodyAfterPost.length).toBe(0);
});
