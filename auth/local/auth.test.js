const supertest = require("supertest");

const app = require("../../app");

const request = supertest(app);

describe("auth endpoints", () => {

  test("should respond with 200 with the player is logged", async () => {
    const rest = await request.post("/auth/local/login").send({
      email: "dayanalexismanrique@gmail.com",
      password: "12345",
    });
    expect(rest.statusCode).toEqual(200);
  });

   test("should respond with 401 when the player email is incorrect", async () => {
    const rest = await request.post("/auth/local/login").send({
      email: "dayanalexismanrique@hotmail.com",
      password: "12345",
    });
    expect(rest.statusCode).toEqual(401);
  });

   test("should respond with 401 when the player email is corret but not the password", async () => {
    const rest = await request.post("/auth/local/login").send({
      email: "dayanalexismanrique@gmail.com",
      password: "123456",
    });
    expect(rest.statusCode).toEqual(401);
  });
});
