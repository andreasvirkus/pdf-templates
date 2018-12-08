<template>
  <main class="formats-page">
    <header class="f-v-align">
      <h1 class="m-right-m">Formaadid:</h1>
      <multiselect class="m-right-m"
        :options="printSizes"
        placeholder="Size"
        :show-labels="false"
        v-model="size"/>

      <button class="btn-icon-s">
        <type-icon class="icon-m"/>
      </button>
      <button class="btn-icon-s"
        ref="tippy"
        :style="{ color: color }">
        <paint-bucket-icon class="icon-m"/>

        <div data-template>
          <input type="text" v-model="color">
        </div>
      </button>
      <button class="btn-icon-s" @click="addBlock">
        <rectangle-icon class="icon-m"/>
      </button>

      <mi-btn
        class="m-left-a m-right-m"
        buttonText="Save" @click="saveTemplate" small/>
      <router-link :to="{ name: 'home' }">Back</router-link>
    </header>

    <section class="formats-page__paper"
      :class="{ 'formats-page__paper--flipped': isPortrait }"
      :style="{
        color: color,
        textAlign: isPortrait ? 'center' : 'right'
      }">
      <vue-draggable-resizable
        v-for="(block, i) in blocks"
        :key="i"
        :parent="true"
        :resizable="true"
        :x="block.x"
        :y="block.y"
        :w="block.width"
        :h="block.height"
        :grid="[25,25]"
        @dragstop="onDrag(i, ...arguments)"
        @resizestop="onResize(i, ...arguments)"
        :style="{
          border: '2px solid #999',
          fontSize: '16px'
        }">
        <mi-editable
          v-model="block.text"
          class="formats-page__block"/>
      </vue-draggable-resizable>
    </section>
  </main>
</template>

<script>
import tippy from 'tippy.js'
import Multiselect from 'vue-multiselect'
import { TypeIcon } from 'vue-feather-icons'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'tippy.js/dist/tippy.css'

import MiBtn from '@/components/MiBtn'
import MiEditable from '@/components/MiEditable'
import RectangleIcon from '@/assets/rectangle.svg'
import PaintBucketIcon from '@/assets/paint.svg'

export default {
  name: 'formats',
  data () {
    return {
      color: '#000000',
      size: 'A3 L',
      printSizes: [
        'A3 L',
        'A3 P',
        'A4 L',
        'A4 P',
        'A6 L',
        'A6 P'
      ],
      blocks: []
    }
  },
  props: {
    id: String,
    formats: Object
  },
  components: {
    MiBtn,
    MiEditable,
    TypeIcon,
    Multiselect,
    RectangleIcon,
    PaintBucketIcon,
    VueDraggableResizable
  },
  computed: {
    isPortrait () {
      return this.size.endsWith('P')
    }
  },
  watch: {
    id: {
      immediate: true,
      handler () {
        const existingFormat = this.formats[this.id]
        if (existingFormat) {
          this.color = existingFormat.color
          this.size = existingFormat.size
          this.blocks = existingFormat.blocks
        } else {
          this.color = '#000000'
          this.size = 'A3 L'
          this.blocks = []
        }
      }
    }
  },
  async mounted () {
    await this.$nextTick()
    const tooltip = this.$refs.tippy
    tippy.one(tooltip, {
      content: tooltip.querySelector('[data-template]'),
      // appendTo: tooltip,
      theme: 'light',
      trigger: 'click',
      interactive: true,
      performance: true,
      placement: 'bottom',
      arrow: true,
      delay: 0,
      animation: 'shift-toward',
      animateFill: false
    })
  },
  methods: {
    addBlock () {
      this.blocks.push({
        text: 'Change me',
        x: 0,
        y: 0,
        color: '#999999'
      })
    },
    saveTemplate () {
      const { color, size, blocks } = this
      this.$emit('addFormat', { color, size, blocks })
    },
    onDrag (i, x, y) {
      console.log(i, x, y)
      this.blocks[i].x = x
      this.blocks[i].y = y
    },
    onResize (i, x, y, width, height) {
      console.log(i, x, y, width, height)
      this.blocks[i].x = x
      this.blocks[i].y = y
      this.blocks[i].width = width
      this.blocks[i].height = height
    }
  }
}
</script>

<style src="tippy.js/dist/themes/light.css"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.formats-page {
  .multiselect {
    max-width: 6rem;
  }

  header {
    display: flex;
    flex-direction: row;
  }

  h1 {
    font-weight: bold;
    font-size: 1.6rem;
  }

  &__paper {
    position: relative;
    background-color: var(--gray-45);
    height: 21cm;
    width: 29.7cm;
    margin-top: 3rem;
    font-family: 'Neris';
    &--flipped {
      height: 29.7cm;
      width: 21cm;
    }
  }
  &__block {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>
