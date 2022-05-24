import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";
const idPost = "07199b7e-578a-46fe-8fbf-b5ca2b5bf5c8";
let token = "";

describe("Teste Remover Post:", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "biancasilva@gmail.com",
        password: "passwd",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });

  describe("- Sem token", () => {
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .delete("/posts/" + idPost)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Token expirado", () => {
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .delete("/posts/" + idPost)
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });
  describe("- Remover post corretamente", () => {
    it("Deve retornar mensagem de remoção", () => {
      return chai
        .request(server)
        .delete("/posts/" + idPost)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          
          chai.expect(res.body).to.be.an("object");
        });
    });
  });
});
