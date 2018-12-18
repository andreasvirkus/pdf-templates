<template>
  <main class="formats-page">
    <header class="f-v-align" ref="formatsHeader">
      <h1 class="m-right-m">Formaadid:</h1>
      <multiselect class="m-right-m"
        :options="printSizes"
        placeholder="Size"
        :show-labels="false"
        v-model="size"/>

      <button class="btn-icon-s tippy">
        <type-icon class="icon-m"/>

        <div data-template>
          <ul>
            <li class="f-center formats-page__typo-grid">
              <strong>H1</strong>
              <label class="f-v-align">Size
                <input v-model="typo.H1.size" type="text"></label>
              <label class="f-v-align">Weight
                <input v-model="typo.H1.weight" type="text"></label>
            </li>
            <li class="f-center formats-page__typo-grid">
              <strong>H2</strong>
              <label class="f-v-align">Size
                <input v-model="typo.H2.size" type="text"></label>
              <label class="f-v-align">Weight
                <input v-model="typo.H2.weight" type="text"></label>
            </li>
            <li class="f-center formats-page__typo-grid">
              <strong>H3</strong>
              <label class="f-v-align">Size
                <input v-model="typo.H3.size" type="text"></label>
              <label class="f-v-align">Weight
                <input v-model="typo.H3.weight" type="text"></label>
            </li>
            <li class="f-center formats-page__typo-grid">
              <strong>P</strong>
              <label class="f-v-align">Size
                <input v-model="typo.P.size" type="text"></label>
              <label class="f-v-align">Weight
                <input v-model="typo.P.weight" type="text"></label>
            </li>
          </ul>
        </div>
      </button>
      <button class="btn-icon-s tippy"
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
      :style="{ textAlign: isPortrait ? 'center' : 'right' }">
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
          border: '4px solid #CACACA',
          fontSize: '16px'
        }">

        <div class="formats-page__block-edit f-center">
          <label class="btn-icon-s f-center tippy">
            <select v-model="block.size">
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="P">P</option>
            </select>
          </label>

          <button class="btn-icon-s" @click="removeBlock(i)">
            <trash-icon class="icon-m"/>
          </button>
        </div>
        <mi-editable
          v-model="block.text"
          :style="{
            fontSize: typo[block.size || 'P'].size,
            fontWeight: typo[block.size || 'P'].weight,
            color
          }"
          class="formats-page__block"/>
      </vue-draggable-resizable>
    </section>
  </main>
</template>

<script>
import tippy from 'tippy.js'
import Multiselect from 'vue-multiselect'
import VueDraggableResizable from 'vue-draggable-resizable'
import { TypeIcon, TrashIcon } from 'vue-feather-icons'
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
      blocks: [],
      typo: {
        H1: {
          size: '24pt',
          weight: 600
        },
        H2: {
          size: '18pt',
          weight: 500
        },
        H3: {
          size: '14pt',
          weight: 400
        },
        P: {
          size: '12pt',
          weight: 400
        }
      }
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
    TrashIcon,
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
    },
    size () {
      this.color = '#000000'
      this.blocks = []
      this.$router.replace({ name: 'formats' })
    }
  },
  async mounted () {
    await this.$nextTick()
    this.initTippy()
  },
  methods: {
    async addBlock () {
      this.blocks.push({
        text: 'Change me',
        x: 0,
        y: 0,
        color: '#999999',
        size: 'P'
      })
      await this.$nextTick()
      this.initTippy()
    },
    removeBlock (i) {
      this.blocks.splice(i, 1)
    },
    saveTemplate () {
      const { color, size, blocks } = this
      this.$emit('addFormat', { color, size, blocks })
      this.$router.push('/')
    },
    onDrag (i, x, y) {
      this.blocks[i].x = x
      this.blocks[i].y = y
    },
    onResize (i, x, y, width, height) {
      this.blocks[i].x = x
      this.blocks[i].y = y
      this.blocks[i].width = width
      this.blocks[i].height = height
    },
    initTippy () {
      const tooltips = this.$refs.formatsHeader.querySelectorAll('.tippy')

      ;[].forEach.call(tooltips, tooltip => {
        if (tooltip._tippy) return
        tippy(tooltip, {
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
      })
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
  &__block-edit {
    position: absolute;
    top: 0;
    right: 0;
  }
  &__typo-grid {
    display: grid;
    grid-template-columns: 2rem 1fr 1fr;

    input {
      width: 4rem;
      margin-left: .25rem;
    }
  }
}
</style>
