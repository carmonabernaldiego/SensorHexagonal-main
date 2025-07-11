import CreateEventUseCase from "../Aplication/CreateEventUseCase";
import MqttPublisher from "./mqtt/MqttPublisher";
import EventController from "./controllers/EventController";

const mqqtPublisher = new MqttPublisher(
  process.env["BROKER_PUBLISHER"] || "mqtt://34.197.63.247:1883"
);
const createEventUseCase = new CreateEventUseCase(mqqtPublisher);

const eventController = new EventController(createEventUseCase);

export { eventController };
