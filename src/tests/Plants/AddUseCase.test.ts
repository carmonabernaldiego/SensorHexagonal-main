import GetByPkUseCase from "../../../src/Plants/Aplication/GetByPkUseCase";

describe("GetByPkUseCase", () => {
  const mockRepo = {
    getByPk: jest.fn().mockResolvedValue([{ id: "abc" }, "OK"]),
    list: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
    StatsPlant: jest.fn(),
  };

  const useCase = new GetByPkUseCase(mockRepo);

  test("CP27 - Devuelve planta por ID existente", async () => {
    const [result] = await useCase.run("abc");
    expect(result).toBeDefined();
    expect(result?.id).toBe("abc");
  });
});
