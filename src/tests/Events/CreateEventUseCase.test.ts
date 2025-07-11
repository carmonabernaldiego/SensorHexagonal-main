import CreateEventUseCase from "../../../src/Events/Aplication/CreateEventUseCase";
import EventRequest from "../../../src/Events/Domain/DTOS/EventRequest";

describe("CreateEventUseCase", () => {
  const mockPublisher = {
    publish: jest.fn().mockResolvedValue(undefined),
  };

  const useCase = new CreateEventUseCase(mockPublisher);

  const request: EventRequest = { If: true, Uv: false, visible: true };

  test("CP21 - Publica evento correctamente en topic MQTT", async () => {
    const result = await useCase.run(request);
    expect(result).toEqual(expect.objectContaining({ visible: true }));
    expect(mockPublisher.publish).toHaveBeenCalled();
  });

  test("CP22 - Retorna evento aunque env no tenga topic definido", async () => {
    delete process.env.PUBLISS_LEDS;
    const result = await useCase.run(request);
    expect(result).toBeDefined();
  });
});
