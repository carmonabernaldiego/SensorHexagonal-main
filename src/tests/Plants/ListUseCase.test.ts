import ListUseCase from "../../../src/Plants/Aplication/ListUseCase";

describe("ListUseCase", () => {
  const mockRepo = {
    list: jest.fn().mockResolvedValue([[{ id: "1", name: "Menta" }], "OK"]),
    getByPk: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
    StatsPlant: jest.fn(),
  };

  const useCase = new ListUseCase(mockRepo);

  test("CP26 - Devuelve lista de plantas", async () => {
    const [result] = await useCase.run();
    expect(result).toBeInstanceOf(Array);
  });
});
