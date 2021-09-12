<template lang="pug">
.base-switch
  label.base-switch__label(
    v-if="label"
    :for="name"
  ) {{ label }}
  input.base-switch__input(
    type="checkbox"
    :id="name"
    :name="name"
    :checked="tempChecked"
    @change="toggleCheck"
  )
  span.base-switch__toggle
    span.thumb
</template>

<script>
export default {
  name: 'BaseSwitch',
  props: {
    name: { type: String, default: '', required: true },
    label: { type: String, default: '' },
    isChecked: { type: Boolean, default: false },
  },
  data() {
    return {
      tempChecked: false,
    };
  },
  watch: {
    isChecked: {
      handler(val) {
        this.tempChecked = val;
      },
      immediate: true,
    },
  },
  methods: {
    toggleCheck(e) {
      const isChecked = e.target.checked;
      this.$emit('change', isChecked);
      this.tempChecked = isChecked;
    },
  },
};
</script>
