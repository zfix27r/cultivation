  <script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    primaryValue: number
    primaryMax: number
    primaryLabelLeft?: string
    primaryLabelRight?: string
    primaryBgColor?: string
    primaryTextColor?: string
    primaryHeight?: number

    secondaryValue: number
    secondaryMax: number
    secondaryLabelLeft?: string
    secondaryLabelRight?: string
    secondaryBgColor?: string
    secondaryTextColor?: string
    secondaryHeight?: number

    icon?: string
  }>(), {
    primaryValue: 0,
    primaryMax: 100,
    primaryBgColor: '#4caf50',
    primaryHeight: 10,
    secondaryBgColor: '#ffd700',
    secondaryHeight: 6,
  })

  const primaryFillStyle = computed(() => ({
    width: `${Math.min(100, (props.primaryValue / props.primaryMax) * 100)}%`,
    background: props.primaryBgColor
  }))

  const secondaryFillStyle = computed(() => ({
    width: `${Math.min(100, (props.secondaryValue / props.secondaryMax) * 100)}%`,
    background: props.secondaryBgColor
  }))

  const primaryContainerStyle = computed(() => ({
    height: `${props.primaryHeight}px`,
  }))

  const secondaryContainerStyle = computed(() => ({
    height: `${props.secondaryHeight}px`,
  }))
</script>

  <template>
    <div class="double-progress">
      <div class="progress-item">
        <span v-if="icon" class="progress-icon">{{ icon }}</span>
        <div class="progress-content">
          <div class="progress-info">
            <span class="info-left">{{ primaryLabelLeft }}</span>
            <span class="info-right">{{ primaryLabelRight }}</span>
          </div>
          <div class="progress-container" :style="primaryContainerStyle">
            <div class="progress-fill" :style="primaryFillStyle"></div>
          </div>
          <div class="progress-container" :style="secondaryContainerStyle">
            <div class="progress-fill" :style="secondaryFillStyle"></div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped lang="scss">
.double-progress {
  width: 100%;

  .progress-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    .progress-icon {
      font-size: 1rem;
      min-width: 20px;
      text-align: center;
    }

    .progress-content {
      flex: 1;

      .progress-info {
        display: flex;
        justify-content: space-between;
        font-size: 0.7rem;
        margin-bottom: 4px;
        opacity: 0.8;
      }

      .info-left {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .info-right {
        font-weight: bold;
      }

      .progress-container {
        width: 100%;

        background: rgba(255, 255, 255, 0.2);
        overflow: hidden;

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }
      }
    }
  }

  .progress-item:last-child {
    margin-bottom: 0;
  }
}
</style>
