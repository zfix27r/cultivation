import { Player } from '../../core/entities/Player'
import { Skill } from '../../core/entities/Skill'
import { IPlayerRepository } from '../../core/repositories/IPlayerRepository'

export class LocalStoragePlayerRepository implements IPlayerRepository {
  private readonly PLAYER_KEY = 'cultivation_player'
  private readonly SKILLS_KEY = 'cultivation_skills'

  private player: Player | null = null
  private skills: Map<string, Skill> = new Map()

  constructor() {
    this.load()
    this.initDefaultSkills()
  }

  private load(): void {
    // Загрузка игрока
    const savedPlayer = localStorage.getItem(this.PLAYER_KEY)
    if (savedPlayer) {
      const data = JSON.parse(savedPlayer)
      this.player = new Player(
        crypto.randomUUID(),
        data.spiritStones,
        data.qi,
        data.energy,
        data.cultivationLevel,
        data.experience,
        data.totalTaps,
        data.enemiesDefeated,
      )
    } else {
      this.player = new Player(crypto.randomUUID())
    }

    // Загрузка навыков
    const savedSkills = localStorage.getItem(this.SKILLS_KEY)
    if (savedSkills) {
      const skillsData = JSON.parse(savedSkills)
      skillsData.forEach((s: any) => {
        const skill = new Skill(
          s.id,
          s.name,
          s.description,
          s.icon,
          s.baseValue,
          s.level,
          s.cost,
          s.maxLevel,
          s.type,
        )
        this.skills.set(s.id, skill)
      })
    }
  }

  private initDefaultSkills(): void {
    if (this.skills.size === 0) {
      const defaultSkills = [
        new Skill(
          'tapDamage',
          'Сила удара',
          'Увеличивает урон от тапа',
          '⚔️',
          1,
          1,
          100,
          10,
          'damage',
        ),
        new Skill(
          'tapSpeed',
          'Авто-тап',
          'Автоматически наносит удары',
          '🤖',
          1,
          0,
          200,
          5,
          'speed',
        ),
        new Skill(
          'criticalChance',
          'Шанс крита',
          'Вероятность критического удара',
          '✨',
          0.05,
          1,
          300,
          10,
          'critical',
        ),
        new Skill(
          'criticalMultiplier',
          'Множитель крита',
          'Увеличение урона при крите',
          '💥',
          2,
          1,
          400,
          5,
          'critical',
        ),
      ]
      defaultSkills.forEach((s) => this.skills.set(s.id, s))
    }
  }

  getPlayer(): Player {
    return this.player!
  }

  savePlayer(player: Player): void {
    this.player = player
    localStorage.setItem(this.PLAYER_KEY, JSON.stringify(player.toJSON()))
  }

  getSkill(id: string): Skill | null {
    return this.skills.get(id) || null
  }

  getAllSkills(): Skill[] {
    return Array.from(this.skills.values())
  }

  saveSkill(skill: Skill): void {
    this.skills.set(skill.id, skill)
    this.saveAllSkills()
  }

  saveSkills(skills: Skill[]): void {
    skills.forEach((s) => this.skills.set(s.id, s))
    this.saveAllSkills()
  }

  private saveAllSkills(): void {
    const skillsArray = Array.from(this.skills.values()).map((s) => s.toJSON())
    localStorage.setItem(this.SKILLS_KEY, JSON.stringify(skillsArray))
  }
}
