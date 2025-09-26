import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('nomes')
export class Nome {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 255 })
  nome!: string
}
