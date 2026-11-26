import Link from "next/link";

export default async function Lista() {
  const res = await fetch("http://localhost:4000/api/utilizadores", {
    cache: "no-store",
  });
  const utilizadores = await res.json();

  return (
    <main style={{ padding: 24 }}>
      <h1>Utilizadores</h1>
      <Link href="/utilizadores/novo">+ Novo utilizador</Link>
      <ul>
        {utilizadores.map((u) => (
          <li key={u.id}>
            <Link href={`/utilizadores/${u.id}`}>{u.nome}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}