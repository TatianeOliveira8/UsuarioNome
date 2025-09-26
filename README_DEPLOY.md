# Deploy Seguro para Produção (DigitalOcean + OpenTofu)

## 1. Pré-requisitos
- Conta na DigitalOcean
- Token de API DigitalOcean (NUNCA comite esse token)
- SSH key configurada na DigitalOcean
- Node.js, npm e OpenTofu instalados localmente

## 2. Estrutura do Projeto
- `frontend/my-app` — React + TypeScript
- `backend` — Express + TypeORM + TypeScript
- `infra` — Infraestrutura (OpenTofu/Terraform)

## 3. Protegendo Secrets
- **NUNCA** comite arquivos com dados sensíveis:
  - `infra/secret.tfvars`
  - `.env` com dados reais
  - tokens de API, senhas, connection strings
- Use sempre arquivos de exemplo:
  - `infra/secret.tfvars.example`
  - `.env.example`
- Garanta que `.gitignore` contenha:
  ```
  infra/*.tfvars
  *.tfvars
  .env
  ```

## 4. Passo a Passo do Deploy

1. **Copie e edite secrets localmente:**
   ```powershell
   cd infra
   Copy-Item -Path .\secret.tfvars.example -Destination .\secret.tfvars
   # Edite .\secret.tfvars e preencha do_token, db_password, etc.
   ```
2. **Rode o script de deploy:**
   ```powershell
   .\run_opentofu.ps1
   ```
   - O script baixa OpenTofu se necessário, faz init/plan/apply.
   - Confirme com `yes` para aplicar.
3. **Acesse o droplet criado:**
   - Backend: `http://<IP_DO_DROPLET>:3001/api/nomes`
   - Frontend: `http://<IP_DO_DROPLET>:5173` (ou porta configurada)

## 5. Pós-Deploy
- Nunca deixe arquivos sensíveis no repositório.
- Revogue tokens expostos após uso.
- Use variáveis de ambiente para secrets em produção.

## 6. Dúvidas?
Se precisar de exemplos de `.env`, `secret.tfvars` ou quiser adaptar para Managed Database, peça ajuda!
