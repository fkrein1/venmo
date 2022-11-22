import { hash } from "bcryptjs";
import chai from "chai";
import chaiHttp from "chai-http";

import { prisma } from "../../../database/prismaClient";
import { app } from "../../../server";

chai.use(chaiHttp);
const { request, expect } = chai;

describe("Test /auth/login endpoint", () => {
  const username = "joao";
  const password = "1234567A";
  const invalidUsername = "pedro";
  const invalidPassword = "A1234567";

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
  });

  it("Valid user should return token and 200", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username, password });
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("token");
  });

  it("Invalid user schema should return error message and 400", async () => {
    const response = await request(app).post("/auth/login").send({ username });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Usename with less than 3 character should return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "as", password });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Password without number should return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username, password: "asddaAsdadawead" });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Password without uppercase letter should return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username, password: "asdda2sdadawead" });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Password with less than 8 characters hould return error message and 400", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username, password: "aasd2A" });
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user schema");
  });

  it("Invalid password should error message and 401", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username, password: invalidPassword });
    expect(response).to.have.status(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user or password");
  });
  it("Invalid user should error message and 401", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: invalidUsername, password });
    expect(response).to.have.status(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.eq("Invalid user or password");
  });
});
