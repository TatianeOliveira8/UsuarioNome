variable "do_token" {
  description = "Token da DigitalOcean (prefira passar via env var ou arquivo tfvars local não versionado)"
  type        = string
  sensitive   = true
}

variable "region" {
  type    = string
  default = "nyc3"
}

variable "droplet_size" {
  type    = string
  default = "s-1vcpu-1gb"
}

variable "image" {
  type    = string
  default = "ubuntu-22-04-x64"
}

variable "db_engine_version" {
  type    = string
  default = "15"
}

variable "db_name" {
  type    = string
  default = "nomesdb"
}

variable "db_user" {
  type    = string
  default = "appuser"
}

variable "db_password" {
  description = "Senha do usuário do banco (sensível). Defina em secret.tfvars, NÃO comite."
  type        = string
  sensitive   = true
  default     = ""
}

variable "git_repo" {
  description = "URL do repositório Git que será clonado no droplet (opcional). Se vazio, o cloud-init não tentará clonar."
  type        = string
  default     = ""
}

variable "node_version" {
  description = "Versão do Node.js a instalar no droplet (usada pelo cloud-init)."
  type        = string
  default     = "18"
}
