<template lang="pug">
.code-editor(
  ref="editor"
)
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export default {
  name: 'CodeEditor',
  props: {
    isDarkTheme: { type: Boolean, default: false },
  },
  data() {
    return {
      jsCode: "function hello() {\n\talert('Hello world!');\n}",
    };
  },
  mounted() {
    // validation settings
    // monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    //     noSemanticValidation: true,
    //     noSyntaxValidation: false
    // });

    // // compiler options
    // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    //     target: monaco.languages.typescript.ScriptTarget.ES6,
    //     allowNonTsExtensions: true,
    //     allowJs: true
    // });

    monaco.editor.create(this.$refs.editor, {
      value: this.jsCode,
      language: 'javascript',
      theme: 'vs-light',
    });

    console.log('monaco.languages');
  },
  watch: {
    isDarkTheme(val) {
      const theme = val ? 'vs-dark' : 'vs-light';

      monaco.editor.setTheme(theme);
    },
  },
};
</script>

<style lang="scss">
.code-editor {
  min-height: 500px;
}
</style>
