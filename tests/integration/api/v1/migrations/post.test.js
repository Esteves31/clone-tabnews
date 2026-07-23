test("POST / api/v1/migrations should return 200 OK", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
});
