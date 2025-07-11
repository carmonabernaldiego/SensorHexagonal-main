import AccessUseCase from "../../../src/Auth/Aplication/AccessUseCase";
import AddUseCase from "../../../src/Auth/Aplication/AddUseCase";
import EncryptService from "../../../src/Auth/Infrastructure/Helpers/EncryptService";
import TokensService from "../../../src/Auth/Infrastructure/Helpers/TokenService";
import AuthRequest from "../../../src/Auth/Domain/DTOS/AuthRequest";
import Auth from "../../../src/Auth/Domain/Auth";
import AuthRepository from "../../../src/Auth/Domain/AuthRepository";

// Mocks
const mockTokenService = {
  generateToken: jest.fn().mockReturnValue("mocked-token"),
  validateToken: jest.fn().mockReturnValue(true),
};

const mockEncryptService = {
  hash: jest.fn((p: string) => `hashed-${p}`),
  compare: jest.fn((h: string, p: string) => h === `hashed-${p}`),
};

const mockAuthRepository: AuthRepository = {
  access: jest.fn(),
  add: jest.fn(),
};

// Casos de prueba para AccessUseCase
describe("AccessUseCase", () => {
  const accessUseCase = new AccessUseCase(
    mockTokenService,
    mockEncryptService,
    mockAuthRepository
  );

  const authReq: AuthRequest = {
    name: "john",
    email: "john@example.com",
    password: "1234",
  };

  test("CP01 - Retorna token válido al login", async () => {
    const mockUser: Auth = {
      id: "1",
      name: "john",
      email: "john@example.com",
      password: "hashed-1234",
    };

    (mockAuthRepository.access as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await accessUseCase.run(authReq);
    expect(result?.token).toBe("mocked-token");
  });

  test("CP02 - Falla si usuario no existe", async () => {
    (mockAuthRepository.access as jest.Mock).mockResolvedValueOnce(null);

    const result = await accessUseCase.run(authReq);
    expect(result).toBeNull();
  });

  test("CP03 - Falla si la contraseña no coincide", async () => {
    const wrongPasswordUser: Auth = {
      id: "2",
      name: "john",
      email: "john@example.com",
      password: "hashed-incorrecta",
    };

    (mockAuthRepository.access as jest.Mock).mockResolvedValueOnce(
      wrongPasswordUser
    );

    const result = await accessUseCase.run(authReq);
    expect(result).toBeNull();
  });
});

// Casos de prueba para AddUseCase
describe("AddUseCase", () => {
  const addUseCase = new AddUseCase(
    mockAuthRepository,
    mockEncryptService,
    mockTokenService
  );

  const authReq: AuthRequest = {
    name: "jane",
    email: "jane@example.com",
    password: "pass",
  };

  test("CP04 - Agrega nuevo usuario con UUID y password hasheado", async () => {
    const mockNewUser: Auth = {
      id: "2",
      name: "jane",
      email: "jane@example.com",
      password: "hashed-pass",
    };

    (mockAuthRepository.add as jest.Mock).mockResolvedValueOnce(mockNewUser);

    const result = await addUseCase.run({ ...authReq });
    expect(result?.id).toBe("2");
    expect(mockEncryptService.hash).toHaveBeenCalledWith("pass");
    expect(result?.token).toBe("mocked-token");
  });

  test("CP05 - Falla si email ya está registrado", async () => {
    (mockAuthRepository.add as jest.Mock).mockResolvedValueOnce(null);

    const result = await addUseCase.run({ ...authReq });
    expect(result).toBeNull();
  });
});

// Casos de prueba para EncryptService
describe("EncryptService", () => {
  const service = new EncryptService();

  test("CP06 - Hashea contraseña correctamente", () => {
    const hashed = service.hash("miClave123");
    expect(hashed).toMatch(/\$2[abxy]\$.{56}/); // formato bcrypt
  });

  test("CP07 - Compara hash y contraseña válida devuelve true", () => {
    const password = "clave123";
    const hash = service.hash(password);
    const result = service.compare(hash, password);
    expect(result).toBe(true);
  });

  test("CP08 - Compara hash y contraseña inválida devuelve false", () => {
    const hash = service.hash("claveOriginal");
    const result = service.compare(hash, "otraClave");
    expect(result).toBe(false);
  });
});

// Casos de prueba para TokenService
describe("TokensService", () => {
  const service = new TokensService();
  const authReq: AuthRequest = {
    name: "maria",
    email: "m@m.com",
    password: "123",
  };

  test("CP09 - Genera token JWT correctamente", () => {
    const token = service.generateToken(authReq);
    expect(typeof token).toBe("string");
  });

  test("CP10 - Valida token JWT correctamente", () => {
    const token = service.generateToken(authReq);
    const isValid = service.validateToken(token);
    expect(isValid).toBe(true);
  });
});
