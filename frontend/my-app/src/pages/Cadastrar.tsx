// src/components/Cadastrar.tsx
import { useState } from 'react';

export function Cadastrar() {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) return alert('Informe um nome');

    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const res = await fetch(`${base}/api/nomes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      });

      if (res.ok) {
        alert('Cadastro realizado!');
        setNome('');
        // Notifica outras partes da app (por exemplo a lista) para atualizar automaticamente
        try {
          window.dispatchEvent(new CustomEvent('nome:cadastrado'))
        } catch {
          // navegador antigo pode falhar; não é crítico
        }
      } else {
        alert('Erro ao cadastrar');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cadastrar Nome</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
