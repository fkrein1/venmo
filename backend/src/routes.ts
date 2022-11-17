import { Router } from "express";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./modules/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const routes = Router();

routes.post("/signup", createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.get("/", ensureAuthenticated, (req, res) =>
  res.status(200).json({ dda: "ok" })
);

export default routes;
