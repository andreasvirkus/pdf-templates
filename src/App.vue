<template>
  <div id="app">
    <transition name="slide">
      <router-view :key="$route.name"
        :fields="fields"
        :formats="formats"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      formats: [],
      fields: []
    }
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
  max-width: 50rem;
  margin: 0 auto;
  padding-top: 5rem;
}
</style>
