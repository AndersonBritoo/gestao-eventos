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

export const atualizar = async (id, { nome, email }) => {
  const u = utilizadores.find((x) => x.id === Number(id));
  if (!u) return null;
  u.nome = nome;
  u.email = email;
  return u;
};

export const apagar = async (id) => {
  const i = utilizadores.findIndex((x) => x.id === Number(id));
  if (i === -1) return false;
  utilizadores.splice(i, 1);
  return true;
};