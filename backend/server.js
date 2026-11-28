import express from "express"
import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/teste");

const PORT = 4000;
const app = express();

app.use(express.json());

const itensSchema = new mongoose.Schema({
	nome: {type: String, required: true},
})

const Item = mongoose.model("Item", itensSchema, "itens");


app.get("/api/itens", async (req, res) => {
	const itens = await Item.find();
	res.json(itens);
});

app.post("/api/itens", async (req, res) => {
	try {
		const item = await Item.create({ nome: req.body.nome });
		res.status(201).json(item);
	} catch (e) {
		res.status(400).json({ erro: e.message });
	}
});


app.listen(PORT, () => {
	console.log("API a correr na porta " + PORT);
});