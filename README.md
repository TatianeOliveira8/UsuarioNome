# Projeto Cadastro de Nomes

Sistema para cadastrar e listar nomes em telas diferentes.

## 🚀 Tecnologias

- **Frontend**: React + TypeScript
- **Backend**: Express + TypeORM + TypeScript  
- **Banco de Dados**: PostgreSQL
- **Deploy**: OpenTofu para DigitalOcean

## 📋 Funcionalidades

- Cadastrar nome
- Listar nomes (tela separada)

## 🛠️ Como executar

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend  
```bash
cd frontend
npm install
npm start
```

## 🚀 Deploy para Produção

Deploy na DigitalOcean usando OpenTofu:

```bash
cd infrastructure
tofu init
tofu plan
tofu apply
```