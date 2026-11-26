import Link from "next/link";
import BotaoApagar from "./BotaoApagar";

export default async function Detalhe({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/api/utilizadores/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return <main style={{ padding: 24 }}>Utilizador não encontrado.</main>;
  const u = await res.json();

  return (
    <main style={{ padding: 24 }}>
      <h1>{u.nome}</h1>
      <p>Email: {u.email}</p>
      <Link href={`/utilizadores/${u.id}/editar`}>Editar</Link>{" "}
      <BotaoApagar id={u.id} />
      <br />
      <Link href="/utilizadores">← Voltar</Link>
    </main>
  );
}