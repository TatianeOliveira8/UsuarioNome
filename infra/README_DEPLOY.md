Deploy com OpenTofu (guia rápido)

Objetivo: provisionar infraestrutura na DigitalOcean usando OpenTofu (compatível com Terraform) e o arquivo de variáveis local `infra/secret.tfvars`.

1) Preparar secrets (local)
- Copie `infra/secret.tfvars.example` para `infra/secret.tfvars`.
- Preencha `do_token`, `db_password`, `db_user`, `db_name` e `ssh_public_key` conforme necessário.
- Nunca comite `infra/secret.tfvars` no repositório.

2) Instalar OpenTofu (script automático)
- Execute `infra\run_opentofu.ps1` no PowerShell. O script tentará baixar o OpenTofu se não estiver instalado.

3) Rodar init/plan/apply
- O script fará `opentofu init` e `opentofu plan -var-file=secret.tfvars`.
- Revise o plano e confirme `yes` para aplicar.

4) Pós-deploy
- Após apply, verifique os outputs (IP do droplet, connection strings).
- Configure variáveis de ambiente no droplet (ou o cloud-init já criou service unit com DATABASE_URL conforme template).

Notas
- Recomendo usar Managed Database da DigitalOcean quando possível.
- Se preferir usar Terraform, substitua `opentofu` por `terraform` nos comandos.
- Se houver problema com o download do OpenTofu, baixe manualmente do https://opentofu.org/ ou do release do GitHub.
