import DecodedToken from "../../../src/Plants/Infrestructure/Service/decodedToken";
import jwt from "jsonwebtoken";

describe("DecodedToken", () => {
  const service = new DecodedToken();

  test("CP25 - Devuelve true si el token es válido", () => {
    const token = jwt.sign(
      { name: "test" },
      process.env.JWT_SECRET ?? "DEFAULT_SECRET"
    );
    const result = service.validate(token);
    expect(result).toBe(true);
  });
});
