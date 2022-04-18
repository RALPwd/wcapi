const request = require("supertest");
const app = require("./app");

// Test para ruta de obtener todos los players
describe("Get players list in route /api/players", () => {
  test("Must responds with success code (200)", async () => {
    const response = await request(app).get("/api/players");
    expect(response.statusCode).toBe(200);
  });
});

// Test 3 para ruta de edición de perfil del gamer
describe("Put the edited profile in route /api/edition  ", () => {
  const body = {
    _id: "625c3ae08c321e5f2408a20b",
    nick: "mellito",
    name: "dayan alexis",
    email: "dayanalexismanrique@gmail.com",
    password: "$2b$10$OmhSwHgFo.Oo4hdTMXT4ueUO9W2uSGIRkGUAhD5XiOYOA1YEgJWay",
    birthday: "1992-03-29T00:00:00.000+00:00",
    picture: "https://i.imgur.com/I2aG4PJ.png",
    state: 1,
    gamePlayed: 0,
    gameWon: 0,
    passwordResetToken: null,
    passwordResetExpires: null,
    createdAt: "2022-04-17T16:05:52.722+00:00",
    updatedAt: "2022-04-17T16:06:01.515+00:00",
  };
  test("Must responds with success code (202) when edition saved", async () => {
    const response = await request(app).put("/api/players/").send(body);
    console.log(response.body);
    expect(response.statusCode).toBe(202);
  });
});
