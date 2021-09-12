<template lang="pug">
  #app.app
    .app__menu 
      p Some random menu
    .app__settings
      p.title Settings
      BaseSwitch(
        name="theme"
        label="Dark theme"
        :is-checked="isDarkTheme"
        @change="toggleDarkTheme"
      )
    .app__code
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
  metaInfo() {
    return {
      meta: [{ name: 'color-scheme', content: 'dark light' }],
    };
  },
  data() {
    return {
      isDarkTheme: true,
    };
  },
  watch: {
    isDarkTheme: {
      handler(val) {
        if (val) {
          document.body.classList.add('dark-mode');
          document.body.classList.remove('light-mode');
        } else {
          document.body.classList.remove('dark-mode');
          document.body.classList.add('light-mode');
        }
      },
      immediate: true,
    },
  },
  methods: {
    toggleDarkTheme(val) {
      this.isDarkTheme = val;
    },
  },
};
</script>

<style lang="scss">
@import '~normalize.css';

.visuallyhidden,
.vh {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

body {
  background: $lightThemeBg;
  font-weight: 500;
  scroll-behavior: smooth;
  color: $lightThemeText;

  * {
    &::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(230, 230, 230, 0.5);
    }
  }

  .crisp-client * {
    visibility: hidden !important;
    opacity: 0;
    pointer-events: none;
  }

  &.dark-mode {
    background: $darkThemeBg;
    color: $darkThemeText;
  }

  @include dark {
    background: $darkThemeBg;
    color: $darkThemeText;

    &.light-mode {
      background: $lightThemeBg;
      color: $lightThemeText;
    }
  }
}

:root {
  color-scheme: light dark; /* both supported */
}

button {
  border: 0;
  cursor: pointer;
  background: transparent;

  &:active,
  &:hover,
  &:focus {
    outline: 0;
    background: inherit;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

.app {
  display: flex;
  align-content: stretch;

  &.is-dark {
    background: $darkGrey900;
  }
}

.title {
  font-weight: bold;
  font-size: 1.125rem;
}

.app__menu,
.app__settings {
  width: 200px;
  flex: 1 0 auto;
  padding: 15px;
}

.app__menu,
.app__settings,
.app__code {
  border: 1px solid $darkGrey400;
  border-right: 0;
}

.app__code {
  width: calc(100% - 400px);
  padding: 15px 0;
}
</style>
