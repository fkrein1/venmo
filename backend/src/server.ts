import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import { errorMiddleware } from "./errors/errorMiddleware";
import routes from "./routes";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerFile = require("../swagger.json");

const PORT = process.env.PORT || 3008;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));
