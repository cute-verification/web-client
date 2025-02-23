<template>
  <transition v-bind="hooks">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "smooth-transition",
  setup() {
    const hooks = {
      css: false,
      onBeforeEnter(el) {
        el.style.transition = "height 0.5s ease";
        el.style.height = 0;
        el.style.overflow = "hidden";
      },
      onEnter(el) {
        el.style.height = `${el.scrollHeight}px`;
      },
      onLeave(el) {
        el.style.height = `${el.scrollHeight}px`;
        el.offsetHeight;
        el.style.height = 0;
      },
      onAfterLeave(el) {
        el.style.transition = "";
        el.style.height = "";
        el.style.overflow = "";
      }
    };
    return { hooks };
  }
};
</script>