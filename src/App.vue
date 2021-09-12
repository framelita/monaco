<template lang="pug">
  #app.app
    .app__menu 
      p Some random menu
    .app__code(
      :class="{ 'is-full-screen': isFullScreen }"
    )
      .code__wrapper
        .code__actions
          BaseSwitch(
            name="theme"
            label="Dark theme"
            :is-checked="isDarkTheme"
            @change="toggleDarkTheme"
          )
          BaseSwitch(
            name="full-screen"
            label="Full screen"
            :is-checked="isFullScreen"
            @change="toggleFullScreen"
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
  metaInfo() {
    return {
      meta: [{ name: 'color-scheme', content: 'dark light' }],
    };
  },
  data() {
    return {
      isDarkTheme: true,
      isFullScreen: false,
    };
  },
  watch: {
    isDarkTheme(val) {
      this.updateDarkTheme(val);
    },
  },
  mounted() {
    const matchedDark = window.matchMedia('(prefers-color-scheme: dark)')
      .matches;

    if (this.$cookie.get('theme')) {
      this.isDarkTheme = this.$cookie.get('theme') === 'dark';
    } else {
      this.isDarkTheme = !!matchedDark;
    }
    // can't use immediate because it will always set to dark
    this.updateDarkTheme(this.isDarkTheme);
  },
  methods: {
    toggleDarkTheme(val) {
      this.isDarkTheme = val;
    },
    toggleFullScreen(val) {
      this.isFullScreen = val;
    },
    updateDarkTheme(val) {
      if (val) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        this.$cookie.set('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        this.$cookie.set('theme', 'light');
      }
      console.log('?', this.$cookie.get('theme'));
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

  .code__wrapper {
    background: $lightThemeBg;
  }

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

    .code__wrapper {
      background: $darkThemeBg;
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
  height: 600px;

  &.is-dark {
    background: $darkGrey900;
  }
}

.title {
  font-weight: bold;
  font-size: 1.125rem;
}

.app__menu {
  width: 200px;
  flex: 1 0 auto;
  padding: 15px;
}

.app__menu,
.app__code {
  border: 1px solid $darkGrey400;
  border-right: 0;
}

.app__code {
  width: calc(100% - 200px);
  padding: 0;

  .code__wrapper {
    height: 100%;
  }

  .code-editor {
    height: calc(100% - 50px);
  }

  .code__actions {
    padding: 10px;
    background: rgba(128, 128, 128, 0.2);
    margin-bottom: 10px;
    height: 40px;

    .base-switch {
      display: inline-block;
      margin-right: 20px;
      min-width: 160px;
    }
  }

  &.is-full-screen {
    .code__wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99;
    }
  }
}
</style>
