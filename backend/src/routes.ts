import { Router } from "express";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./modules/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/useCases/createUser/CreateUserController";
import { GetBalanceController } from "./modules/useCases/getBalance/GetBalanceController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getBalanceController = new GetBalanceController();

const routes = Router();

routes.post("/signup", createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.get("/balance", ensureAuthenticated, getBalanceController.handle);

export default routes;
