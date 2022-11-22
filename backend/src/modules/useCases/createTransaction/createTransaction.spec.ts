import chai from "chai";
import chaiHttp from "chai-http";

import { prisma } from "../../../database/prismaClient";
import { app } from "../../../server";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

chai.use(chaiHttp);
const { request, expect } = chai;

describe("Test /transactions POST endpoint", async () => {
  const createUserUseCase = new CreateUserUseCase();
  const userOne = "joao";
  const userTwo = "felipe";
  const password = "1234567A";

  afterEach(async () => {
    await prisma.transactions.deleteMany();
    await prisma.users.deleteMany();
    await prisma.accounts.deleteMany();
  });

  it("Sucessfull transaction should return 201 and sucess message", async () => {
    const { token } = await createUserUseCase.execute({
      username: userOne,
      password,
    });

    await createUserUseCase.execute({
      username: userTwo,
      password,
    });

    const response = await request(app)
      .post("/transaction")
      .send({ creditUsername: userTwo, transactionValue: 20 })
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(201);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.have.eq(
      "Transaction was sucessfully created"
    );
  });

  it("Credit and debit account shouldn't be equal", async () => {
    const { token } = await createUserUseCase.execute({
      username: userOne,
      password,
    });

    const response = await request(app)
      .post("/transaction")
      .send({ creditUsername: userOne, transactionValue: 20 })
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.have.eq(
      "Debit account must be different from credit account"
    );
  });

  it("Transfer shouldn't be greater than balance", async () => {
    const { token } = await createUserUseCase.execute({
      username: userOne,
      password,
    });

    await createUserUseCase.execute({
      username: userTwo,
      password,
    });

    const response = await request(app)
      .post("/transaction")
      .send({ creditUsername: userTwo, transactionValue: 200 })
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.have.eq("Insufficient funds");
  });

  it("Credit account should exist", async () => {
    const { token } = await createUserUseCase.execute({
      username: userOne,
      password,
    });

    const response = await request(app)
      .post("/transaction")
      .send({ creditUsername: userTwo, transactionValue: 20 })
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(404);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.have.eq("Credit account not found");
  });

  it("Transaction schema shouldn't be incorrect", async () => {
    const { token } = await createUserUseCase.execute({
      username: userOne,
      password,
    });

    await createUserUseCase.execute({
      username: userTwo,
      password,
    });

    const response = await request(app)
      .post("/transaction")
      .send({ username: userTwo, value: 200 })
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.have.eq("Invalid transaction schema");
  });
});
