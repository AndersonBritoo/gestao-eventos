import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { listar, obter, criar, atualizar, apagar } from "./data/utilizadores.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/utilizadores", async (req, res) => {
  res.json(await listar());
});

app.get("/api/utilizadores/:id", async (req, res) => {
  const u = await obter(req.params.id);
  if (!u) return res.status(404).json({ erro: "Utilizador não encontrado" });
  res.json(u);
});

app.post("/api/utilizadores", async (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email)
    return res.status(400).json({ erro: "nome e email são obrigatórios" });
  res.status(201).json(await criar({ nome, email }));
});

app.put("/api/utilizadores/:id", async (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email)
    return res.status(400).json({ erro: "nome e email são obrigatórios" });
  const u = await atualizar(req.params.id, { nome, email });
  if (!u) return res.status(404).json({ erro: "Utilizador não encontrado" });
  res.json(u);
});

app.delete("/api/utilizadores/:id", async (req, res) => {
  const ok = await apagar(req.params.id);
  if (!ok) return res.status(404).json({ erro: "Utilizador não encontrado" });
  res.sendStatus(204);
});

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gestao-eventos")
  .then(() => {
    console.log("MongoDB ligado");
    app.listen(4000, () => console.log("API em http://localhost:4000"));
  })
  .catch((err) => console.error("Erro ao ligar ao MongoDB:", err.message));