import { Router } from "express";

import { AuthenticateUserController } from "./modules/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const routes = Router();

routes.post("/signup", createUserController.handle);
routes.post("/login", authenticateUserController.handle);

export default routes;
