import mongoose from "mongoose";
import Utilizador from "../Models/Utilizador.js";

const idValido = (id) => mongoose.isValidObjectId(id);

export const listar = async () => Utilizador.find();

export const obter = async (id) => {
	if (!idValido(id)) return null;
	return Utilizador.findById(id);
};

export const criar = async ({ nome, email }) =>
	Utilizador.create({ nome, email });

export const atualizar = async (id, { nome, email }) => {
	if (!idValido(id)) return null;
	return Utilizador.findByIdAndUpdate(
		id,
		{ nome, email },
		{ new: true, runValidators: true }
	);
};

export const apagar = async (id) => {
	if (!idValido(id)) return false;
	const r = await Utilizador.findByIdAndDelete(id);
	return r !== null;
};

// ROUTES

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
