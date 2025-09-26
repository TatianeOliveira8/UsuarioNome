import { Router } from 'express'
import { AppDataSource } from '../config/database'
import { Nome } from '../entidade/Nome'

const router = Router()
const repo = AppDataSource.getRepository(Nome)

// Listar todos os nomes
router.get('/nomes', async (req, res) => {
  try {
    const nomes = await repo.find({ order: { id: 'DESC' } })
    res.json(nomes)
  } catch {
    res.status(500).json({ message: 'Erro ao listar nomes' })
  }
})

// Cadastrar um novo nome
router.post('/nomes', async (req, res) => {
  const { nome } = req.body
  if (!nome?.trim()) return res.status(400).json({ message: 'Nome é obrigatório' })

  try {
    const novo = repo.create({ nome: nome.trim() })
    await repo.save(novo)
    res.status(201).json(novo)
  } catch {
    res.status(500).json({ message: 'Erro ao cadastrar nome' })
  }
})

export default router
