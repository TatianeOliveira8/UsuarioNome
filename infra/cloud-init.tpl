#cloud-config
package_update: true
packages:
  - git
  - curl

runcmd:
  - apt-get update
  - apt-get install -y postgresql postgresql-contrib
  - |
    # Configurar PostgreSQL: criar usuário e banco
    sudo -u postgres psql -c "CREATE USER ${db_user} WITH PASSWORD '${db_password}';" || true
    sudo -u postgres psql -c "CREATE DATABASE ${db_name} OWNER ${db_user};" || true
  - |
    # Expor PostgreSQL para localhost (por padrão já escuta em localhost)
    sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/" /etc/postgresql/*/main/postgresql.conf || true
    systemctl restart postgresql

runcmd:
  - curl -fsSL https://deb.nodesource.com/setup_${node_version}.x | bash -
  - apt-get install -y nodejs
  - mkdir -p /opt/app
  - chown -R ubuntu:ubuntu /opt/app
  - |
    if [ -n "${git_repo}" ]; then
      cd /opt/app
      sudo -u ubuntu git clone "${git_repo}" . || true
      cd /opt/app
      sudo -u ubuntu bash -lc "npm install"

      # Build do frontend (se houver) e compile backend (assume scripts em package.json)
      sudo -u ubuntu bash -lc "npm run build || true"

      # Criar unit systemd para rodar a aplicação (assume 'npm run start')
      cat > /etc/systemd/system/meu-app.service <<'EOF'
[Unit]
Description=Meu App Node
After=network.target postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/app
Environment=NODE_ENV=production
Environment=DATABASE_URL=postgres://${db_user}:${db_password}@localhost:5432/${db_name}
ExecStart=/usr/bin/npm run start
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

      systemctl daemon-reload
      systemctl enable meu-app.service
      systemctl start meu-app.service
    fi
