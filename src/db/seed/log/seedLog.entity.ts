import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SeedLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;
}
