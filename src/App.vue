<template>
  <div id="app">
    <Example></Example>
  </div>
</template>

<script>
import Example from '@/components/Example/index'
export default {
  name: 'App',
  components: {
    Example
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
./components/Example.vue
