"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Editar() {
  const { id } = useParams();
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/api/utilizadores/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((u) => {
        setNome(u.nome);
        setEmail(u.email);
      })
      .catch(() => setErro("Utilizador não encontrado."));
  }, [id]);

  async function guardar(e) {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/api/utilizadores/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });
    if (!res.ok) return setErro("Erro ao guardar.");
    router.push(`/utilizadores/${id}`);
    router.refresh();
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Editar utilizador</h1>
      <form onSubmit={guardar}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Guardar alterações</button>
      </form>
      {erro && <p>{erro}</p>}
    </main>
  );
}