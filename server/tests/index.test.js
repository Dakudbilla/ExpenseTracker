const request = require("supertest");
const app = require("../app");

const { setup, teardown } = require("./config");

describe("API Endpoints", () => {
  let server;

  beforeAll(async () => {
    server = await setup();
  });

  afterAll(async () => {
    await teardown(server);
  });
  it("Gets all transactions", async () => {
    const { body, status } = await request(app).get("/api/v1/transactions");

    expect(status).toBe(200);
    console.log(body);
  });
});
