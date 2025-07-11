import MysqlRepository from "../../../src/Plants/Infrestructure/MysqlRepository";
import PlantsModel from "../../../src/Plants/Infrestructure/Models/PlantsModel";

describe("MysqlRepository", () => {
  const mockSequelize = { query: jest.fn() } as any;
  const mockUuid = { generate: () => "uuid" };

  const repo = new MysqlRepository(PlantsModel, mockUuid, mockSequelize);

  test("CP29 - Guarda planta nueva correctamente", async () => {
    const createSpy = jest.spyOn(PlantsModel, "create").mockResolvedValueOnce({
      id: "uuid",
      name: "Cactus",
    } as any);

    const [result] = await repo.add({
      name: "Cactus",
      userId: "u2",
      plantType: "Sucu",
    });
    expect(result?.id).toBe("uuid");

    createSpy.mockRestore();
  });
});
