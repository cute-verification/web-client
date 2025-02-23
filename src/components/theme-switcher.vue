<script>
import '@mdui/icons/light-mode.js';
import '@mdui/icons/dark-mode.js';
import {toggle_theme} from "../utils/theme.js";
import {useDark, useToggle} from "@vueuse/core";

export default {
  name: "theme_switcher",
  methods: {
    toggle() {
      toggle_theme(() => {
        return useDark()
      }, (isDark) => {
        return useToggle(isDark);
      })
    }
  }
}

</script>

<template>
  <mdui-button-icon @click="toggle">
  </mdui-button-icon>
</template>

<style scoped>

</style>