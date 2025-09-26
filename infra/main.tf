output "droplet_ip" {
  value = digitalocean_droplet.app.ipv4_address
}
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = ">= 2.0.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

data "template_file" "cloud_init" {
  template = file("./cloud-init.tpl")
  vars = {
    git_repo     = var.git_repo
    node_version = var.node_version
    db_name      = var.db_name
    db_user      = var.db_user
    db_password  = var.db_password
  }
}

resource "digitalocean_droplet" "app" {
  name   = "meu-app-droplet"
  region = var.region
  size   = var.droplet_size
  image  = var.image
  tags   = ["meu-app"]
  user_data = data.template_file.cloud_init.rendered
}
