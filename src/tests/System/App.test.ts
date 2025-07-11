import request from "supertest";
import express from "express";
import app from "../../../src/App"; // Asegúrate de exportar `app` en lugar de solo `app.listen(...)` si es necesario

describe("App Router Integration", () => {
  test("CP11 - /auth responde 200", async () => {
    const res = await request(app).get("/auth");
    expect(res.status).toBe(200);
  });

  test("CP12 - /plants responde 200", async () => {
    const res = await request(app)
      .get("/plants")
      .set("Authorization", "Bearer TOKEN_VALIDO");
    expect(res.status).toBe(200);
  });

  test("CP13 - /stages responde 200", async () => {
    const res = await request(app).get("/stages");
    expect(res.status).toBe(200);
  });

  test("CP14 - /events responde 200", async () => {
    const res = await request(app).get("/events");
    expect(res.status).toBe(200);
  });
});
