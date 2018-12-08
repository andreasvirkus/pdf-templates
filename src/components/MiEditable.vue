<template>
  <div contenteditable="true"
    @input="$emit('input', $event.target.innerText)">
  </div>
</template>

<script>
export default {
  mounted () {
    this.$el.innerText = this.value
  },
  props: {
    value: String
  },
  watch: {
    content () {
      this.$el.innerText = this.value
    }
  }
}
</script>
