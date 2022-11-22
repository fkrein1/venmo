import chai from "chai";
import chaiHttp from "chai-http";

import { prisma } from "../../../database/prismaClient";
import { app } from "../../../server";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

chai.use(chaiHttp);
const { request, expect } = chai;

describe("Test /auth/me endpoint", async () => {
  const createUserUseCase = new CreateUserUseCase();
  const username = "joao";
  const password = "1234567A";
  const invalidToken = "daljdalsjdja.dasjdajd.231das";

  after(async () => {
    await prisma.users.deleteMany();
    await prisma.accounts.deleteMany();
  });

  it("Valid token should return user data and 200", async () => {
    const { token } = await createUserUseCase.execute({ username, password });
    const response = await request(app)
      .get("/auth/me")
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("username");
    expect(response.body.username).to.eq(username);
    expect(response.body).to.have.property("account");
    expect(response.body.account.balance).to.eq(100);
  });

  it("Empty token should return error messsage and 401", async () => {
    const response = await request(app).get("/auth/me");
    expect(response).to.have.status(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Token is missing");
  });

  it("Empty token should return error messsage and 401", async () => {
    const response = await request(app)
      .get("/auth/me")
      .set({ Authorization: `Bearer ${invalidToken}` });

    expect(response).to.have.status(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid token");
  });
});
