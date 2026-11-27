import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gestao-eventos")
	.then(() => {
		console.log("MongoDB ligado");
		app.listen(4000, () => console.log("API em http://localhost:4000"));
	})
	.catch((err) => console.error("Erro ao ligar ao MongoDB:", err.message));
