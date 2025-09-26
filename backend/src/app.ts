import express, { Request, Response } from 'express'
import nomesRoutes from './routes/nomes'
import { corsMiddleware } from './middlewares/cors'

const app = express()

app.use(express.json())
app.use(corsMiddleware)

app.use('/api', nomesRoutes)

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend funciona' })
})

export default app