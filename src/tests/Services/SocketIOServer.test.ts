import ExternalWebsocketIo from "../../../src/PlantReadings/Infrestructure/SocketIO/SocketIOServer";

describe("ExternalWebsocketIo", () => {
  test("CP24 - Inicializa socket y emite evento", async () => {
    const socket = new ExternalWebsocketIo();
    await expect(
      socket.sendMessage("evento-prueba", { test: 123 })
    ).resolves.not.toThrow();
  });
});
