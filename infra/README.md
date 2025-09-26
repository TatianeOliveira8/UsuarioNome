OpenTofu / Terraform - Infra mínima para DigitalOcean

Arquivos:
- main.tf: cria um droplet e um cluster PostgreSQL na DigitalOcean
- variables.tf: variáveis configuráveis
- outputs.tf: informações úteis após o apply

Como usar (local):



1) Instale o OpenTofu no seu PC (OpenTofu é um fork/alternative open-source do Terraform). Depois de instalado, você pode usar o binário `opentofu` ou `terraform` se você tiver feito alias.

2) Na pasta infra, crie um arquivo `secret.tfvars` (NÃO comitar) com o token e, opcionalmente, o repositório git a clonar:

```hcl
do_token     = "SEU_TOKEN_DIGITALOCEAN"
git_repo     = "https://github.com/usuario/seu-repo.git" # opcional
node_version = "18" # opcional
```

3) Execute (PowerShell) — exemplo usando `opentofu`:

```powershell
cd .\infra
opentofu init
opentofu plan -var-file=secret.tfvars
opentofu apply -var-file=secret.tfvars
```

Se você preferir usar o binário `terraform` e já tem um alias apontando para OpenTofu, os comandos `terraform init/plan/apply` também funcionam.

Observações sobre o provisionamento do droplet:
- Se `git_repo` for informado, o cloud-init irá clonar esse repo em `/opt/app`, instalar dependências (`npm install`) e criar uma unit systemd (`/etc/systemd/system/meu-app.service`) para iniciar o app com `npm run start`.
- A unit assume que o serviço escuta na interface padrão e que o `start` script no `package.json` inicia a aplicação.

Notas de segurança:
- Nunca comite o token no repositório. Use variáveis de ambiente ou arquivos tfvars ignorados pelo git.
- Os recursos criados geram custo na sua conta DigitalOcean.


Notas de segurança:
- Nunca comite o token no repositório. Use variáveis de ambiente ou arquivos tfvars ignorados pelo git.
- Os recursos criados geram custo na sua conta DigitalOcean.

