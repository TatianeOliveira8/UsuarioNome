import dotenv from 'dotenv'
import app from './app'
import { AppDataSource } from './config/database'

dotenv.config()

const PORT = process.env.PORT || 3001

AppDataSource.initialize()
  .then(() => {
    // Logar tipo de banco usado (não expõe credenciais)
    const dbType = (AppDataSource.options as any).type || 'unknown'
    console.log(`✅ Conectado ao banco: ${dbType} com TypeORM!`)
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`))
  })
  .catch((err) => {
    console.error('Erro ao iniciar AppDataSource:', err)
    process.exit(1)
  })