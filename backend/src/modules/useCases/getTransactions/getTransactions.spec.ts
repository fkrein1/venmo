import chai from "chai";
import chaiHttp from "chai-http";

import { prisma } from "../../../database/prismaClient";
import { app } from "../../../server";
import { CreateTransactionUseCase } from "../createTransaction/CreateTransactionUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

chai.use(chaiHttp);
const { request, expect } = chai;

describe("Test /transactions GET endpoint", async () => {
  const createUserUseCase = new CreateUserUseCase();
  const createTransactionUseCase = new CreateTransactionUseCase();
  const userOne = "joao";
  const userTwo = "felipe";
  const password = "1234567A";

  after(async () => {
    await prisma.transactions.deleteMany();
    await prisma.users.deleteMany();
    await prisma.accounts.deleteMany();
  });

  it("Should return correct transactions", async () => {
    const { token } = await createUserUseCase.execute({
      username: userOne,
      password,
    });

    await createUserUseCase.execute({
      username: userTwo,
      password,
    });

    const userOneData = await prisma.users.findUnique({
      where: { username: userOne },
    });
    const userTwoData = await prisma.users.findUnique({
      where: { username: userTwo },
    });

    await createTransactionUseCase.execute({
      debitedAccountId: userOneData?.accountId as string,
      creditUsername: userTwoData?.username as string,
      transactionValue: 20,
    });

    await createTransactionUseCase.execute({
      debitedAccountId: userTwoData?.accountId as string,
      creditUsername: userOneData?.username as string,
      transactionValue: 30.11,
    });
    const response = await request(app)
      .get("/transaction")
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(200);
    expect(response.body[0].value).to.equal(30.11);
    expect(response.body[0].username).to.equal(userTwoData?.username);
    expect(response.body[0].type).to.equal("credit");
    expect(response.body[1].value).to.equal(-20);
    expect(response.body[1].username).to.equal(userTwoData?.username);
    expect(response.body[1].type).to.equal("debit");
  });
});
