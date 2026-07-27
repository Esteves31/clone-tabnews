test("DELETE /api/v1/migrations should return 405 Method Not Allowed", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    expect(response.status).toBe(405);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
        message: "Método não permitido",
    });
});
