import express from "express";
import { verificarAdminTreinador } from "../api/middlewares/verificarAdminTreinador";
import { verificarAutenticacao } from "../api/middlewares/verificarAutenticacao";
import { apiAdapter } from "../apiAdapter";
const adminTreinadorRouter = express.Router();

const BASE_URL = "http://localhost:8000/api/v1";
const gymapp_api = apiAdapter(BASE_URL);

adminTreinadorRouter.post(
  "/adminTreinador/ginasio/desafio/",
  verificarAutenticacao,
  verificarAdminTreinador,
  (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.body.ginasioId;
    let body = req.body;
    delete body["ginasioId"];

    gymapp_api
      .post(`/adminTreinador/${userId}/ginasio/${ginasioId}/desafio/`, body)
      .then((resp) => {
        res.send(resp.data);
      })
      .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
      });
  }
);

adminTreinadorRouter.delete(
  "/adminTreinador/desafio/:desafioId",
  verificarAutenticacao,
  verificarAdminTreinador,
  (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.params.desafioId;
    gymapp_api
      .delete(`/adminTreinador/${userId}/desafio/${desafioId}`)
      .then((resp) => {
        res.send(resp.data);
      })
      .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
      });
  }
);

adminTreinadorRouter.put(
  "/adminTreinador/desafio",
  verificarAutenticacao,
  verificarAdminTreinador,
  (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.body.desafioId;
    let body = req.body;
    delete body["desafioId"];
    gymapp_api
      .put(`/adminTreinador/${userId}/desafio/${desafioId}`, body)
      .then((resp) => {
        res.send(resp.data);
      })
      .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
      });
  }
);

adminTreinadorRouter.put(
  "/adminTreinador/desafio/editar",
  verificarAutenticacao,
  verificarAdminTreinador,
  (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.body.desafioId;
    let body = req.body;
    delete body["desafioId"];
    gymapp_api
      .put(`/adminTreinador/${userId}/desafio/${desafioId}/editar`, body)
      .then((resp) => {
        res.send(resp.data);
      })
      .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
      });
  }
);

adminTreinadorRouter.get(
  "/adminTreinador/musculos/",
  verificarAutenticacao,
  verificarAdminTreinador,
  (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
      .get(`/adminTreinador/${userId}/musculos/`)
      .then((resp) => {
        res.send(resp.data);
      })
      .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
      });
  }
);
adminTreinadorRouter.get(
  "/adminTreinador/marca/:marcaId/alunos/",
  verificarAutenticacao,
  verificarAdminTreinador,
  (req, res) => {
    const userId = res.locals.uid;
    const marcaId = req.params.marcaId;
    gymapp_api
      .get(`/adminTreinador/${userId}/marca/${marcaId}/alunos`)
      .then((resp) => {
        res.send(resp.data);
      })
      .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
      });
  }
);

export { adminTreinadorRouter };
