let utilizadores = [
  { id: 1, nome: "Ana Silva", email: "ana@exemplo.pt" },
  { id: 2, nome: "Rui Costa", email: "rui@exemplo.pt" },
];
let proximoId = 3;

export const listar = async () => utilizadores;

export const obter = async (id) =>
  utilizadores.find((u) => u.id === Number(id)) || null;

export const criar = async ({ nome, email }) => {
  const novo = { id: proximoId++, nome, email };
  utilizadores.push(novo);
  return novo;
};