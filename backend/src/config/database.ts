import "reflect-metadata";
import { DataSource } from "typeorm";
import { Nome } from "../entidade/Nome";

// Suporta uso simples com SQLite por padrão (sem precisar instalar Postgres)
// Para usar Postgres, defina a variável de ambiente DATABASE_URL (ex: postgres://user:pass@host:5432/db)
const databaseUrl = process.env.DATABASE_URL || '';
const usePostgres = process.env.DB_TYPE === 'postgres' || databaseUrl.startsWith('postgres');

export const AppDataSource = usePostgres
  ? new DataSource({
      type: 'postgres',
      url: databaseUrl || undefined,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER || process.env.PGUSER || 'postgres',
      password: process.env.DB_PASS || process.env.PGPASSWORD || undefined,
      database: process.env.DB_NAME || process.env.PGDATABASE || undefined,
      // Em produção preferimos usar migrations; desative o synchronize quando NODE_ENV=production
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      logging: false,
      entities: [Nome],
      migrations: [],
      subscribers: [],
    })
  : new DataSource({
      type: 'sqlite',
      database: process.env.SQLITE_DB || 'database.sqlite',
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      logging: false,
      entities: [Nome],
      migrations: [],
      subscribers: [],
    });
