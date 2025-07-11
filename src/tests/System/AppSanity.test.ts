import request from "supertest";
import app from "../../../src/App";

describe("App Sanity Check", () => {
  test('CP30 - Responde 200 en "/"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
