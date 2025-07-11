import MysqlUserRepository from "../../../src/Auth/Infrastructure/UserMysqlRepository";
import UUIDService from "../../../src/Auth/Infrastructure/Helpers/UUIDService";
import UserModel from "../../../src/Auth/Infrastructure/models/UserModel";
import AuthRequest from "../../../src/Auth/Domain/DTOS/AuthRequest";

jest.mock("../../../src/Auth/Infrastructure/models/UserModel");

const uuidService = new UUIDService();
const repo = new MysqlUserRepository(UserModel, uuidService);

describe("MysqlUserRepository", () => {
  test("CP15 - Retorna usuario si email existe", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue({
      id: "1",
      name: "John",
      email: "john@mail.com",
      password: "pass",
    });

    const result = await repo["isExistedEmail"]("john@mail.com");
    expect(result).not.toBeNull();
    expect(result?.email).toBe("john@mail.com");
  });

  test("CP16 - Retorna null si email no existe", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    const result = await repo["isExistedEmail"]("fake@mail.com");
    expect(result).toBeNull();
  });

  test("CP17 - Agrega nuevo usuario si email no existe", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
    (UserModel.create as jest.Mock).mockResolvedValue({
      id: "uuid-1",
      name: "Jane",
      email: "jane@mail.com",
      password: "secret",
    });

    const req: AuthRequest = {
      name: "Jane",
      email: "jane@mail.com",
      password: "secret",
    };
    const result = await repo.add(req);
    expect(result).not.toBeNull();
    expect(result?.email).toBe("jane@mail.com");
  });

  test("CP18 - Retorna null si email ya está registrado", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce({}); // email existe
    const req: AuthRequest = {
      name: "John",
      email: "john@mail.com",
      password: "1234",
    };
    const result = await repo.add(req);
    expect(result).toBeNull();
  });
});
