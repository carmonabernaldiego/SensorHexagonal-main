import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const NAME_DATABASE = process.env.DATABASE_NAME ?? "multi";
const USERNAME = process.env.DATABASE_USER ?? "root";
const PASSWORD = process.env.DATABASE_PASSWORD ?? "admin";
const HOST = process.env.DATABASE_HOST ?? "localhost";
const PORT = parseInt(process.env.DATABASE_PORT ?? "3306");

const sequelize_conexion = new Sequelize(NAME_DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: "mysql",
  logging: false,
});

export default sequelize_conexion;
