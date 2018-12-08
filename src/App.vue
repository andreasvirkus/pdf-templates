<template>
  <div id="app">
    <transition name="slide">
      <router-view :key="$route.name"
        :fields="fields"
        :formats="formats"
        @addFormat="saveTemplate"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      fields: [],
      formats: {}
    }
  },
  persist: ['formats', 'fields'],
  methods: {
    saveTemplate (tmp) {
      const { color, size, blocks } = tmp
      const newFormat = {
        [`${size}-${color}`]: { color, size, blocks }
      }
      console.log('Saving new format', newFormat)
      this.formats = Object.assign({}, this.formats, newFormat)
    }
  },
  created () {
    const noFocusStyles = 'a,a:focus,button,button:focus,input,input:focus,textarea,textarea:focus,div:focus {outline:none}'
    const styleEl = document.createElement('style')
    styleEl.setAttribute('id', '_qualitista-outline-styles')
    document.head.appendChild(styleEl)

    // Inject outline preventing styles only for non-keyboard users
    document.addEventListener('mousedown', () => {
      styleEl.innerHTML = noFocusStyles
    })

    document.addEventListener('keyup', evt => {
      const styles = evt.keyCode === 9 ? '' : noFocusStyles
      styleEl.innerHTML = styles
    })
  }
}
</script>

<style src="@/styles/variables.css"></style>
<style src="@/styles/global.css"></style>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 95%;
  margin: 0 auto;
  padding-top: 5rem;
}
</style>
