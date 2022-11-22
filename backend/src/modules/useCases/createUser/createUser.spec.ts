import { hash } from "bcryptjs";
import chai from "chai";
import chaiHttp from "chai-http";

import { prisma } from "../../../database/prismaClient";
import { app } from "../../../server";

chai.use(chaiHttp);
const { request, expect } = chai;

describe("Test /auth/signup endpoint", () => {
  const username = "joao";
  const password = "1234567A";
  const newUser = "felipe";

  before(async () => {
    await prisma.users.create({
      data: {
        username,
        password: await hash(password, 8),
        account: {
          create: {
            balance: 100,
          },
        },
      },
    });
  });
  after(async () => {
    await prisma.users.deleteMany();
    await prisma.accounts.deleteMany();
  });

  it("Valid user data should return token and 201", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ username: newUser, password });
    expect(response).to.have.status(201);
    expect(response.body).to.have.property("token");
  });

  it("User already exists should error message and 400", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ username, password });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("User already exists");
  });

  it("Invalid user schema should return error message and 400", async () => {
    const response = await request(app).post("/auth/signup").send({ username });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Usename with less than 3 character should return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ username: "as", password });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Password without number should return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ username, password: "asddaAsdadawead" });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Password without uppercase letter should return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ username, password: "asdda2sdadawead" });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Password with less than 8 characters hould return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({ username, password: "aasd2A" });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });
});
