"use client";

import { useEffect, useState } from "react";

const erroDeTipo: number = "isso nao e um numero";

type HealthResponse = {
  status: string;
  items: string[];
};

export default function Home() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

    fetch(`${apiUrl}/health/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro na API: ${res.status}`);
        return res.json();
      })
      .then((json: HealthResponse) => setData(json))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Status da aplicação</h1>

      {error && <p style={{ color: "red" }}>Erro: {error}</p>}

      {!data && !error && <p>Carregando...</p>}

      {data && (
        <>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <ul>
            {data.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}