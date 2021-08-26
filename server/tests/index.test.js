const request = require("supertest");
const app = require("../app");
const { fakeTransaction } = require("./fake");
const { setup, teardown } = require("./config");
const { async } = require("regenerator-runtime");

describe("API Endpoints", () => {
  let server;

  beforeAll(async () => {
    server = await setup();
  });

  afterAll(async () => {
    await teardown(server);
  });

  it("Adds a transaction", async () => {
    const { body, status } = await request(app)
      .post("/api/v1/transactions")
      .send(fakeTransaction());

    expect(status).toBe(201);
    expect(body.succes).toEqual(true);
    expect(body.data.text).toEqual("Eat");
  });

  it("Gets all transactions", async () => {
    const { body, status } = await request(app).get("/api/v1/transactions");

    expect(status).toBe(200);
    console.log(body);
  });
});
