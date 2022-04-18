const supertest = require("supertest");

const app = require("../../app");

const request = supertest(app);

describe("Player Endpoints", () => {
  test("should respont with 201 status code", async () => {
    const rest = await request.post("/api/players/").send({
      nick: "mellito",
      name: "dayan manrique",
      email: "otraparatodo@hotmail.com",
      password: "12345",
      birthday: "1992-03-29",
    });
    expect(rest.statusCode).toEqual(201);
  });


});
