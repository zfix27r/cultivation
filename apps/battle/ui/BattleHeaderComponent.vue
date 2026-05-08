<script setup lang="ts">
import { computed } from 'vue'
import { useBattleStore } from '@/ui/useBattleStore'
import DoubleProgressBar from '@/ui/components/DoubleProgressBar.vue'
import NavComponent from '@/ui/NavComponent.vue'


const store = useBattleStore()

const form = computed(() => {
  if (store.playerForm.expCap > 0) return store.playerForm
  return null
})

const energy = computed(() => {
  if (store.playerEnergy.expCap > 0) return store.playerEnergy
  return null
})

const spirit = computed(() => {
  if (store.playerSpirit.expCap > 0) return store.playerSpirit
  return null
})
</script>

<template>
  <header>
    <div class="container">
      <div class="container-player">
        <div class="player-name">
          <span class="name-avatar">🧙</span>
          <span class="name-value">{{ store.player.name }}</span>
        </div>

        <div class="player-rank">
          <span class="rank-icon">👑</span>
          <span class="rank-value">{{ store.player?.rank }}</span>
        </div>

        <div class="player-health">
          <span class="health-icon">❤️</span>
          <span class="health-value">{{ store.player.health }}/{{ store.player.healthMax }}</span>
        </div>

        <div class="player-gems">
          <span class="gems-icon">💎</span>
          <span class="gems-value">{{ store.player.gems }}</span>
        </div>

        <div class="player-power">
          <span class="power-icon">🌟</span>
          <span class="power-value">{{ store.player.power }}</span>
        </div>

        <NavComponent />
      </div>

      <div class="container-foundation">
        <div class="foundation-item" v-if="form">
          <DoubleProgressBar :primary-value="form.reserve" :primary-max="form.reserveMax"
            :primary-label-left="`${form.realmName}`" :primary-label-right="`слой ${form.level}`"
            :secondary-value="form.expTotal" :secondary-max="form.expCap" icon="❤️" primary-bg-color="#ff4757"
            secondary-bg-color="#ffd700" />
        </div>
        <div class="foundation-item" v-if="energy">

        </div>
        <div class="foundation-item" v-if="spirit">

        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  flex-shrink: 0;
}

.container {
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;

  .container-player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;

    .player-name {
      display: flex;
      align-items: center;
      gap: 6px;

      .name-avatar {
        font-size: 1.2rem;
      }

      .name-value {
        font-weight: bold;
        font-size: 0.9rem;
      }
    }

    .player-rank {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255, 215, 0, 0.15);
      padding: 2px 8px;
      border-radius: 20px;

      .rank-icon {
        font-size: 0.8rem;
      }

      .rank-value {
        font-size: 0.8rem;
        font-weight: bold;
        color: #ffd700;
      }
    }

    .player-health {
      display: flex;
      align-items: center;
      gap: 4px;

      .health-icon {
        font-size: 0.8rem;
      }

      .health-value {
        font-size: 0.8rem;
      }
    }

    .player-gems {
      display: flex;
      align-items: center;
      gap: 4px;

      .gems-icon {
        font-size: 0.8rem;
      }

      .gems-value {
        font-size: 0.8rem;
        font-weight: bold;
        color: #4caf50;
      }
    }

    .player-power {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255, 215, 0, 0.1);
      padding: 2px 8px;
      border-radius: 20px;

      .power-icon {
        font-size: 0.8rem;
      }

      .power-value {
        font-size: 0.8rem;
        font-weight: bold;
        color: #ffd700;
      }
    }
  }

  .container-foundation {
    display: flex;
    justify-content: space-between;
    gap: 12px;

    .foundation-item {
      flex: 1;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 8px;
    }
  }
}
</style>
