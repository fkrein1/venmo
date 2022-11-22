// eslint-disable-next-line import/no-extraneous-dependencies
import chai from "chai";

import chaiHttp = require("chai-http");

import { prisma } from "../database/prismaClient";
import { app } from "../server";

chai.use(chaiHttp);
const { request, expect } = chai;

// describe("Test login endpoint", () => {
//   before(() => {
//     prisma.users.create({
//       data: {
//         username: "joao",
//         password: "23213131231",
//         account: {
//           create: {
//             balance: 100,
//           },
//         },
//       },
//     });
//   });
//   after(() => {
//     prisma.users.delete({ where: { username: "joao" } });
//   });

//   it("should return token and 200", async () => {
//     const response = await request(app).post("/login").send(login.validUser);
//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property("token");
//   });
// });
