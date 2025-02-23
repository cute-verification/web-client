<script setup>
import { defineProps } from 'vue';

defineProps({
  description: String
})
</script>

<template>
  <mdui-list-item slot="header"
                  alignment="center"
                  rounded>
    <div :style="{ display: 'flex' }">
      <slot name="icon"></slot>
      <span slot="description">{{ description }}</span>
    </div>
  </mdui-list-item>
</template>

<style scoped>

</style>