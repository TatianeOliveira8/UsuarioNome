<#
Script para inicializar e aplicar a infraestrutura com OpenTofu no Windows PowerShell.
- Verifica se 'opentofu' está disponível; se não, baixa o binário para %USERPROFILE%\bin
- Exige que você tenha um arquivo 'infra/secret.tfvars' local com seus secrets (não commite)
- Executa: opentofu init -> plan -> apply com o arquivo de var

Uso:
1) Copie infra/secret.tfvars.example para infra/secret.tfvars e preencha seus valores.
2) Rode este script no PowerShell (pode precisar de permissões para adicionar ao PATH):
   .\run_opentofu.ps1

#>

param(
    [string]$VarFile = "secret.tfvars"
)

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $here

# Local para instalar o executável
$binDir = "$env:USERPROFILE\bin"
$otf = Join-Path $binDir "opentofu.exe"

function Ensure-OpenTofu {
    if (Get-Command opentofu -ErrorAction SilentlyContinue) {
        Write-Host "OpenTofu já disponível no PATH"
        return
    }

    if (Test-Path $otf) {
        Write-Host "OpenTofu encontrado em $otf (adicionando ao PATH temporariamente)"
        $env:PATH = "$binDir;$env:PATH"
        return
    }

    New-Item -ItemType Directory -Path $binDir -Force | Out-Null
    $tmp = Join-Path $env:TEMP "opentofu.zip"
    $url = "https://github.com/opentofu/opentofu/releases/latest/download/opentofu_windows_amd64.zip"
    Write-Host "Baixando OpenTofu..."
    Invoke-WebRequest -Uri $url -OutFile $tmp -UseBasicParsing
    Write-Host "Descompactando para $binDir..."
    Expand-Archive -LiteralPath $tmp -DestinationPath $binDir -Force
    Remove-Item $tmp -Force
    $env:PATH = "$binDir;$env:PATH"
    Write-Host "OpenTofu instalado em $binDir"
}

if (-Not (Test-Path (Join-Path $here $VarFile))) {
    Write-Host "Arquivo $VarFile não encontrado em $here"
    Write-Host "Copie secret.tfvars.example para secret.tfvars e preencha os valores (NÃO COMITAR)."
    exit 1
}

Ensure-OpenTofu

# Inicializar e aplicar
Write-Host "Inicializando OpenTofu (init)..."
opentofu init

Write-Host "Gerando plano (plan). Revise antes de aplicar."
opentofu plan -var-file="$VarFile"

$confirm = Read-Host "Deseja aplicar o plano? (yes/no)"
if ($confirm -ne 'yes') {
    Write-Host "Abortando apply. Revise o plano manualmente e rode novamente quando pronto."
    exit 0
}

Write-Host "Aplicando infra (apply)."
opentofu apply -var-file="$VarFile"

Write-Host "Operação finalizada. Verifique o output e os recursos no painel DigitalOcean."
