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

  it("Adds a transaction succesfully", async () => {
    const { body, status } = await request(app)
      .post("/api/v1/transactions")
      .send(fakeTransaction());

    expect(status).toBe(201);
    expect(body.succes).toEqual(true);
    expect(body.data.text).toEqual("Eat");
  });

  it("Fails to add transaction because of missing field", async () => {
    const { body, status } = await request(app)
      .post("/api/v1/transactions")
      .send({
        text: "Eat",
      });
    expect(status).toBe(400);

    expect(body.success).toEqual(false);
  });

  it("Gets all transactions", async () => {
    const { body, status } = await request(app).get("/api/v1/transactions");

    expect(status).toBe(200);
    expect(body.count).toEqual(1);
  });

  it("Deletes transaction succesfully", async () => {
    const { body } = await request(app).get("/api/v1/transactions");
    const { body: delBody, status: delStatus } = await request(app).del(
      `/api/v1/transactions/${body.data[0]._id}`
    );

    expect(delStatus).toBe(200);
    expect(delBody.success).toBe(true);
    expect(delBody.data).toEqual({});
  });

  it("Fails to delete transaction which does not exist", async () => {
    const { body: delBody, status: delStatus } = await request(app).delete(
      `/api/v1/transactions/61279bc012f0026f446d9b94`
    );

    expect(delStatus).toBe(404);
    expect(delBody.success).toBe(false);
    expect(delBody.error).toEqual("transaction not found");
  });
});
