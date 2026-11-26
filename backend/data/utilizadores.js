import mongoose from "mongoose";
import Utilizador from "../models/Utilizador.js";

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