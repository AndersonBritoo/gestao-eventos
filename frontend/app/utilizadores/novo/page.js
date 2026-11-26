"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Novo() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function guardar(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/utilizadores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });
    if (!res.ok) return setErro("Erro ao guardar.");
    router.push("/utilizadores");
    router.refresh();
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Novo utilizador</h1>
      <form onSubmit={guardar}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Guardar</button>
      </form>
      {erro && <p>{erro}</p>}
    </main>
  );
}