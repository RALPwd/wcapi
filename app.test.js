const request = require("supertest");
const app = require("./app");

// Test para ruta de obtener todos los players
describe("Get players list in route /api/players", () => {
  test("Must responds with success code (200)", async () => {
    const response = await request(app).get("/api/players");
    expect(response.statusCode).toBe(200);
  });
});

// Test 1 para ruta de login, si usr y passw son correctos,statuscode=200, si no 400
// usuario y contraseña registradas en el sistema
describe("Post send email and password in route /api/players/email", () => {
  const body = {
    email: "corys90@hotmail.com",
    password: "12345",
  };
  test("Must responds with success code (200) if access able", async () => {
    const response = await request(app).post("/api/players/email").send(body);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});

// Test 2 para ruta de login, si usr y passw son correctos,statuscode=200, si no 400
// usuario y contraseña no registradas en el sistema
describe("Post send email and password in route /api/players/email", () => {
  const body = {
    email: "corys90@hotmail.com",
    password: "cris.09",
  };
  test("Must responds with success code (401) for access denied", async () => {
    const response = await request(app).post("/api/players/email").send(body);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
  });
});

// Test 3 para ruta de edición de perfil del gamer

describe("Put send email and password in route /api/players/email", () => {
  const body = {
    email: "corys90@hotmail.com",
    password: "cris.09",
  };
  test("Must responds with success code (401) for access denied", async () => {
    const response = await request(app).post("/api/players/email").send(body);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
  });
});
