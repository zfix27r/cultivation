import { Player } from '../entities/Player'
import { Skill } from '../entities/Skill'

export interface IPlayerRepository {
  getPlayer(): Player
  savePlayer(player: Player): void

  getSkill(id: string): Skill | null
  getAllSkills(): Skill[]
  saveSkill(skill: Skill): void
  saveSkills(skills: Skill[]): void
}
