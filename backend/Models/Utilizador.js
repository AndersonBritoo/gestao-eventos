import mongoose from "mongoose";

const utilizadorSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
});

// devolve "id" (string) em vez de "_id" e "__v", para o frontend continuar igual
utilizadorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

// 3.º argumento = nome da coleção no Compass
export default mongoose.model("Utilizador", utilizadorSchema, "utilizadores");