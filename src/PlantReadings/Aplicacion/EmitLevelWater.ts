import WebsocketService from "../Domain/Socket/WebsocketService";
import LevelWaterRequest from "../Domain/DTOS/LevelWaterRequest";

export default class EmitLevelWater {
  constructor(readonly sockedService: WebsocketService) {}

  async run(request: LevelWaterRequest): Promise<void> {
    const data = {
      type: "levelWater",
      level: request,
    };

    this.sockedService.sendMessage("message", data);
  }
}
