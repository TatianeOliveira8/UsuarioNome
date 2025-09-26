// src/components/Listar.tsx
import { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nome: string;
}

export function Listar() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        const res = await fetch(`${base}/api/nomes`);
      if (res.ok) {
        const data: Usuario[] = await res.json();
        setUsuarios(data);
      } else {
        alert('Erro ao buscar usuários');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();

    const onCadastrado = () => fetchUsuarios()
    window.addEventListener('nome:cadastrado', onCadastrado)
    return () => window.removeEventListener('nome:cadastrado', onCadastrado)
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Lista de Usuários</h2>
      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {usuarios.map((usuario) => (
            <li
              key={usuario.id}
              className="border p-2 rounded hover:bg-gray-100"
            >
              {usuario.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
