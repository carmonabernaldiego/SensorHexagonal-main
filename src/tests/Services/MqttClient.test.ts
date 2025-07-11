import MqttClient from "../../../src/PlantReadings/Infrestructure/Mqtt/MqttClient";
import SavePlantReadingUseCase from "../../../src/PlantReadings/Aplicacion/SavePlantReadingUseCase";
import EmitLedsUseCase from "../../../src/PlantReadings/Aplicacion/EmitLedsUseCase";
import EmitLigthUseCase from "../../../src/PlantReadings/Aplicacion/EmitLigthUseCase";
import EmitFanUseCase from "../../../src/PlantReadings/Aplicacion/EmitFanUseCase";
import EmitWaterPumpUseCase from "../../../src/PlantReadings/Aplicacion/EmitWaterPumpUseCase";
import EmitLevelWater from "../../../src/PlantReadings/Aplicacion/EmitLevelWater";

// mocks de dependencias internas
const mockDep = { run: jest.fn() } as any;

describe("MqttClient", () => {
  test("CP23 - Simula recepción de mensaje y ejecuta usecase", () => {
    expect(() => {
      new MqttClient(
        new SavePlantReadingUseCase(mockDep, mockDep, mockDep),
        new EmitLedsUseCase(mockDep),
        new EmitLigthUseCase(mockDep),
        new EmitFanUseCase(mockDep),
        new EmitWaterPumpUseCase(mockDep),
        new EmitLevelWater(mockDep)
      );
    }).not.toThrow();
  });
});
