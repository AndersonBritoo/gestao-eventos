"use client";
import { useRouter } from "next/navigation";

export default function BotaoApagar({ id }) {
  const router = useRouter();

  async function apagar() {
    if (!confirm("Tens a certeza que queres apagar este utilizador?")) return;
    const res = await fetch(`http://localhost:4000/api/utilizadores/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return alert("Erro ao apagar.");
    router.push("/utilizadores");
    router.refresh();
  }

  return <button onClick={apagar}>Apagar</button>;
}