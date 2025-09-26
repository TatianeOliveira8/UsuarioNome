Este repositório contém um backend (Node + TypeORM + Express) e um frontend (Vite + React).

Passos rápidos para rodar localmente e conectar front ↔ back:

1) Backend
- Vá para a pasta backend
- Copie/edite .env com as credenciais do Postgres (opcional)
- Instale dependências: npm install
- Rode em dev: npm run dev

O backend roda por padrão na porta 3001 e expõe endpoints em /api/nomes

2) Frontend
- Vá para frontend/my-app
- Copie .env.example para .env e ajuste VITE_API_URL se necessário
- Instale dependências: npm install
- Rode: npm run dev

3) Observações
- O backend já tem um middleware CORS que permite a origem definida em FRONTEND_URL (ou http://localhost:3000 por padrão). Se o frontend rodar em outra porta, ajuste FRONTEND_URL ou use a variável VITE_API_URL no frontend.
