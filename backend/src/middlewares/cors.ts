import { Request, Response, NextFunction } from 'express'

// Middleware CORS mínimo sem dependência externa
export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Permite configurar a origem via FRONTEND_URL. Em desenvolvimento assumimos o Vite (5173).
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'
  // Em dev, Vite pode usar portas diferentes (5173, 5174...). Para impedir falhas de preflight,
  // espelhe o Origin da requisição quando presente. Em produção, preferir definir FRONTEND_URL.
  const origin = req.get('Origin') || allowedOrigin
  res.setHeader('Access-Control-Allow-Origin', origin)
  // Evita caches que não considerem Origin diferente
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
}
