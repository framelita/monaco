<template lang="pug">
.code-editor(
  ref="editor"
)
</template>

<script>
import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/editor/editor.main.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export default {
  name: 'CodeEditor',
  props: {
    value: { type: String, default: '' },
    isDarkTheme: { type: Boolean, default: false },
    fileIndex: { type: Number, default: 0 },
  },
  data() {
    return {
      tempValue: '',
    };
  },
  computed: {
    theme() {
      return this.isDarkTheme ? 'vs-dark' : 'vs-light';
    },
  },
  watch: {
    fileIndex(val) {
      monaco.editor.getModels()[0].setValue(this.value);
    },
    isDarkTheme: {
      handler() {
        monaco.editor.setTheme(this.theme);
      },
      immediate: true,
    },
  },
  mounted() {
    // validation settings
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true,
      allowJs: true,
    });

    monaco.editor.create(this.$refs.editor, {
      value: this.value,
      language: 'javascript',
      theme: this.theme,
      automaticLayout: true,
    });

    console.log('monaco.languages', monaco.editor.getModels()[0]);
  },
};
</script>

<style lang="scss">
.code-editor {
  min-height: 500px;
}
</style>
