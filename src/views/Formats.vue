<template>
  <div class="about">
    <header>
      <h1>Formaadid:</h1>
      <button>A3 L</button>

      <button class="btn-icon">
        <type-icon class="icon-m"/>
      </button>
      <button class="btn-icon">
        <paint-bucket-icon class="icon-m"/>
      </button>
    </header>
  </div>
</template>

<script>
import { TypeIcon } from 'vue-feather-icons'
import PaintBucketIcon from '@/assets/paint.svg'

export default {
  name: 'formats',
  components: { TypeIcon, PaintBucketIcon }
}
</script>
