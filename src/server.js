// dotenv을 불러옴
require("dotenv").config()
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

// env에 PORT가 지정되어 있지 않다면 4000번으로 설정
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

// graphqlyoga에 express가 있어 express서버에 접근 가능함.
server.express.use(logger("dev"));

server.start({ port: PORT }, () => console.log(`Server running on http://localhost:${PORT}`));