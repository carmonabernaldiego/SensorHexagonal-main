import TokenService from "../../../src/Auth/Infrastructure/Helpers/TokenService";

describe("TokenService", () => {
  const service = new TokenService();

  test("CP20 - Token inválido retorna false", () => {
    const result = service.validateToken("token-invalido");
    expect(result).toBe(false);
  });
});
