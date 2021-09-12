<template lang="pug">
  #app
    BaseSwitch(
      name="theme"
      label="Dark theme"
      :is-checked="isDarkTheme"
      @change="toggleDarkTheme"
    )
    CodeEditor(
      :is-dark-theme="isDarkTheme"
    )
</template>

<script>
import BaseSwitch from './components/base/BaseSwitch.vue';
import CodeEditor from './components/CodeEditor.vue';

export default {
  name: 'App',
  components: {
    BaseSwitch,
    CodeEditor,
  },
  data() {
    return {
      isDarkTheme: false,
    };
  },
  methods: {
    toggleDarkTheme(val) {
      this.isDarkTheme = val;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
