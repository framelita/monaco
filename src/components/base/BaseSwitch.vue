<template lang="pug">
.base-switch
  input.base-switch__input(
    type="checkbox"
    :id="name"
    :name="name"
    :checked="tempChecked"
    @change="toggleCheck"
  )
  label.base-switch__label(
    v-if="label"
    :for="name"
  ) 
    span.text {{ label }}
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

<style lang="scss">
.base-switch__input {
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .base-switch__label .base-switch__toggle {
    background-color: $green;

    .thumb {
      transform: translateX(16px);
    }
  }

  &:focus + .base-switch__label .base-switch__toggle {
    box-shadow: 0 0 1px $green;
  }
}

.base-switch__label {
  span {
    display: inline-block;
    vertical-align: middle;
  }

  .text {
    max-width: calc(100% - 52px);
  }
}

.base-switch__toggle {
  margin: 0;
  cursor: pointer;
  width: 40px;
  height: 22px;
  background-color: $lightGrey700;
  transition: 0.4s;
  position: relative;
  display: inline-block;
  border-radius: 34px;
  margin-left: 10px;

  .thumb {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 5px;
    bottom: 4px;
    background-color: $white;
    box-shadow: 0 4px 4px rgba(10, 31, 68, 0.16);
    transition: 0.4s;
    border-radius: 34px;
  }
}
</style>
